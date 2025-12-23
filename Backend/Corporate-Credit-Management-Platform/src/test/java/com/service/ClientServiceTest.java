package com.service;

import com.document.Client;
import com.document.PrimaryContact;
import com.dto.ClientRequestDTO;
import com.dto.ClientResponseDTO;
import com.dto.PrimaryContactDTO;
import com.exception.ClientNotFoundException;
import com.repository.ClientRepository;
import com.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private ClientService clientService;

    private static final String TOKEN = "Bearer test-token";
    private static final String RM_ID = "rm123";

    private void mockJwt() {
        when(request.getHeader("Authorization")).thenReturn(TOKEN);
        when(jwtService.extractUserId("test-token")).thenReturn(RM_ID);
    }

    private ClientRequestDTO sampleRequest() {
        return ClientRequestDTO.builder()
                .companyName("ABC Ltd")
                .industry("Manufacturing")
                .address("Mumbai")
                .annualTurnover(25.5)
                .documentsSubmitted(true)
                .primaryContact(
                        PrimaryContactDTO.builder()
                                .name("Raghav")
                                .email("raghav@abc.com")
                                .phone("9876543210")
                                .build()
                )
                .build();
    }

    private Client sampleClient() {
        return Client.builder()
                .id("c1")
                .companyName("ABC Ltd")
                .industry("Manufacturing")
                .address("Mumbai")
                .annualTurnover(25.5)
                .documentsSubmitted(true)
                .rmId(RM_ID)
                .primaryContact(
                        PrimaryContact.builder()
                                .name("Raghav")
                                .email("raghav@abc.com")
                                .phone("9876543210")
                                .build()
                )
                .build();
    }

    // ---------------- CREATE ----------------

    @Test
    void createClient_shouldCreateAndReturnResponse() {
        mockJwt();
        ClientRequestDTO req = sampleRequest();
        Client saved = sampleClient();

        when(clientRepository.save(any(Client.class))).thenReturn(saved);

        ClientResponseDTO res = clientService.createClient(req);

        assertNotNull(res);
        assertEquals("ABC Ltd", res.getCompanyName());
        assertEquals("Manufacturing", res.getIndustry());
        assertEquals("Raghav", res.getPrimaryContact().getName());

    }

    // ---------------- GET MY CLIENTS ----------------

    @Test
    void getMyClients_shouldReturnAll_whenNoFilters() {
        mockJwt();
        when(clientRepository.findByRmId(RM_ID))
                .thenReturn(List.of(sampleClient()));

        List<ClientResponseDTO> res = clientService.getMyClients(null, null);

        assertEquals(1, res.size());
    }

    @Test
    void getMyClients_shouldFilterByName() {
        mockJwt();
        when(clientRepository.findByRmIdAndCompanyNameContainingIgnoreCase(RM_ID, "ABC"))
                .thenReturn(List.of(sampleClient()));

        List<ClientResponseDTO> res = clientService.getMyClients("ABC", null);

        assertEquals(1, res.size());

    }

    @Test
    void getMyClients_shouldFilterByIndustry() {
        mockJwt();
        when(clientRepository.findByRmIdAndIndustryContainingIgnoreCase(RM_ID, "Manu"))
                .thenReturn(List.of(sampleClient()));

        List<ClientResponseDTO> res = clientService.getMyClients(null, "Manu");

        assertEquals(1, res.size());

    }

    // ---------------- GET BY ID ----------------

    @Test
    void getClientById_shouldReturnClient_whenExists() {
        mockJwt();
        when(clientRepository.findByIdAndRmId("c1", RM_ID))
                .thenReturn(Optional.of(sampleClient()));

        ClientResponseDTO res = clientService.getClientById("c1");

        assertNotNull(res);
        assertEquals("c1", res.getId());
    }

    @Test
    void getClientById_shouldThrow_whenNotFound() {
        mockJwt();
        when(clientRepository.findByIdAndRmId("c1", RM_ID))
                .thenReturn(Optional.empty());

        assertThrows(ClientNotFoundException.class,
                () -> clientService.getClientById("c1"));
    }

    // ---------------- UPDATE ----------------

    @Test
    void updateClient_shouldUpdateAndReturn() {
        mockJwt();
        Client existing = sampleClient();
        ClientRequestDTO req = sampleRequest();
        req.setCompanyName("ABC Pvt Ltd");

        when(clientRepository.findByIdAndRmId("c1", RM_ID))
                .thenReturn(Optional.of(existing));
        when(clientRepository.save(any(Client.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        ClientResponseDTO res = clientService.updateClient("c1", req);

        assertEquals("ABC Pvt Ltd", res.getCompanyName());
    }

    @Test
    void updateClient_shouldThrow_whenNotFound() {
        mockJwt();
        when(clientRepository.findByIdAndRmId("c1", RM_ID))
                .thenReturn(Optional.empty());

        ClientRequestDTO clientRequestDTO = sampleRequest();

        assertThrows(ClientNotFoundException.class,
                () -> clientService.updateClient("c1",clientRequestDTO));
    }

    // ---------------- ADMIN: GET ALL ----------------

    @Test
    void getAllClientsForAdmin_shouldReturnAll() {
        when(clientRepository.findAll())
                .thenReturn(List.of(sampleClient(), sampleClient()));

        List<ClientResponseDTO> res = clientService.getAllClientsForAdmin();

        assertEquals(2, res.size());
        verify(clientRepository).findAll();
    }
}
