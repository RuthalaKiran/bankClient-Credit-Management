package com.service;

import com.document.CreditRequest;
import com.dto.CreditRequestCreateDTO;
import com.dto.CreditRequestResponseDTO;
import com.dto.CreditRequestUpdateDTO;
import com.enums.CreditStatus;
import com.exception.ResourceNotFoundException;
import com.repository.CreditRequestRepository;
import com.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class CreditRequestServiceTest {

    @Mock
    private CreditRequestRepository creditRepo;

    @Mock
    private JwtService jwtService;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private CreditRequestService creditService;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    private static final String TOKEN = "Bearer test-token";
    private static final String RAW_TOKEN = "test-token";
    private static final String RM_ID = "rm123";

    @BeforeEach
    void setUp() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(request.getHeader("Authorization")).thenReturn(TOKEN);
        when(jwtService.extractUserId(RAW_TOKEN)).thenReturn(RM_ID);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    private CreditRequestCreateDTO createReq() {
        return CreditRequestCreateDTO.builder()
                .clientId("client1")
                .requestAmount(500000.0)
                .tenureMonths(12)
                .purpose("Working capital")
                .build();
    }

    private CreditRequest sampleCredit() {
        return CreditRequest.builder()
                .id("cr1")
                .clientId("client1")
                .submittedBy(RM_ID)
                .requestAmount(500000.0)
                .tenureMonths(12)
                .purpose("Working capital")
                .status(CreditStatus.PENDING)
                .remarks("")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    // ---------------- CREATE (RM) ----------------

    @Test
    void createCreditRequest_shouldCreateAndReturn() {

        CreditRequest saved = sampleCredit();

        when(creditRepo.save(any(CreditRequest.class)))
                .thenReturn(saved);

        CreditRequestResponseDTO res =
                creditService.createCreditRequest(createReq());

        assertNotNull(res);
        assertEquals("client1", res.getClientId());
        assertEquals(RM_ID, res.getSubmittedBy());
        assertEquals(CreditStatus.PENDING, res.getStatus());

    }

    // ---------------- GET LIST ----------------

    @Test
    void getCreditRequests_shouldReturnOwn_whenRoleIsRM() {

        doReturn(
                List.of(new SimpleGrantedAuthority("ROLE_RM"))
        ).when(authentication).getAuthorities();

        when(creditRepo.findBySubmittedBy(RM_ID))
                .thenReturn(List.of(sampleCredit()));

        List<CreditRequestResponseDTO> res =
                creditService.getCreditRequests();

        assertEquals(1, res.size());
    }

    @Test
    void getCreditRequests_shouldReturnAll_whenRoleIsAnalyst() {

        doReturn(
                List.of(new SimpleGrantedAuthority("ROLE_ANALYST"))
        ).when(authentication).getAuthorities();

        when(creditRepo.findAll())
                .thenReturn(List.of(sampleCredit(), sampleCredit()));

        List<CreditRequestResponseDTO> res =
                creditService.getCreditRequests();

        assertEquals(2, res.size());
    }

    // ---------------- GET BY ID ----------------

    @Test
    void getById_shouldReturnOwn_whenRoleIsRM() {

        doReturn(
                List.of(new SimpleGrantedAuthority("ROLE_RM"))
        ).when(authentication).getAuthorities();

        when(creditRepo.findByIdAndSubmittedBy("cr1", RM_ID))
                .thenReturn(Optional.of(sampleCredit()));

        CreditRequestResponseDTO res =
                creditService.getById("cr1");

        assertNotNull(res);
        assertEquals("cr1", res.getId());
    }

    @Test
    void getById_shouldReturnAny_whenRoleIsAnalyst() {

        doReturn(
                List.of(new SimpleGrantedAuthority("ROLE_ANALYST"))
        ).when(authentication).getAuthorities();

        when(creditRepo.findById("cr1"))
                .thenReturn(Optional.of(sampleCredit()));

        CreditRequestResponseDTO res =
                creditService.getById("cr1");

        assertNotNull(res);
    }

    @Test
    void getById_shouldThrow_whenNotFound() {

        doReturn(
                List.of(new SimpleGrantedAuthority("ROLE_ANALYST"))
        ).when(authentication).getAuthorities();

        when(creditRepo.findById("cr1"))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> creditService.getById("cr1"));
    }

    // ---------------- UPDATE ----------------

    @Test
    void updateStatus_shouldUpdateAndReturn() {

        CreditRequest credit = sampleCredit();
        CreditRequestUpdateDTO dto =
                new CreditRequestUpdateDTO(
                        CreditStatus.APPROVED,
                        "Approved");

        when(creditRepo.findById("cr1"))
                .thenReturn(Optional.of(credit));
        when(creditRepo.save(any(CreditRequest.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        CreditRequestResponseDTO res =
                creditService.updateStatus("cr1", dto);

        assertEquals(CreditStatus.APPROVED, res.getStatus());
        assertEquals("Approved", res.getRemarks());

    }

    @Test
    void updateStatus_shouldThrow_whenNotFound() {

        when(creditRepo.findById("cr1"))
                .thenReturn(Optional.empty());

        CreditRequestUpdateDTO dto =
                new CreditRequestUpdateDTO(
                        CreditStatus.REJECTED,
                        "Rejected");

        assertThrows(ResourceNotFoundException.class,
                () -> creditService.updateStatus("cr1", dto));
    }
}