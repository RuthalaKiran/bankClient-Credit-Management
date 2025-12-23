package com.controller;

import com.dto.*;
import com.enums.CreditStatus;
import com.service.CreditRequestService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreditRequestControllerTest {

    @Mock
    private CreditRequestService creditService;

    @InjectMocks
    private CreditRequestController creditRequestController;

    private CreditRequestCreateDTO createReq() {
        return CreditRequestCreateDTO.builder()
                .clientId("client1")
                .requestAmount(500000.0)
                .tenureMonths(12)
                .purpose("Working capital")
                .build();
    }

    private CreditRequestUpdateDTO updateReq() {
        return CreditRequestUpdateDTO.builder()
                .status(CreditStatus.APPROVED)
                .remarks("Approved")
                .build();
    }

    private CreditRequestResponseDTO sampleResponse() {
        return CreditRequestResponseDTO.builder()
                .id("cr1")
                .clientId("client1")
                .submittedBy("rm123")
                .requestAmount(500000.0)
                .tenureMonths(12)
                .purpose("Working capital")
                .status(CreditStatus.PENDING)
                .remarks("")
                .createdAt(LocalDateTime.now())
                .build();
    }

    // ---------------- CREATE ----------------

    @Test
    void create_shouldReturnCreatedCreditRequest() {

        CreditRequestCreateDTO req = createReq();
        CreditRequestResponseDTO resDto = sampleResponse();

        when(creditService.createCreditRequest(req))
                .thenReturn(resDto);

        ResponseEntity<ApiResponse<CreditRequestResponseDTO>> response =
                creditRequestController.create(req);

        ApiResponse<CreditRequestResponseDTO> body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("Credit request created", body.getMessage());
        assertEquals("cr1", body.getData().getId());

    }

    // ---------------- GET ALL ----------------

    @Test
    void getAll_shouldReturnList() {

        List<CreditRequestResponseDTO> list =
                List.of(sampleResponse(), sampleResponse());

        when(creditService.getCreditRequests())
                .thenReturn(list);

        ResponseEntity<ApiResponse<List<CreditRequestResponseDTO>>> response =
                creditRequestController.getAll();

        ApiResponse<List<CreditRequestResponseDTO>> body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("Credit requests fetched", body.getMessage());
        assertEquals(2, body.getData().size());

    }

    // ---------------- GET BY ID ----------------

    @Test
    void getById_shouldReturnCreditRequest() {

        CreditRequestResponseDTO resDto = sampleResponse();

        when(creditService.getById("cr1"))
                .thenReturn(resDto);

        ResponseEntity<ApiResponse<CreditRequestResponseDTO>> response =
                creditRequestController.getById("cr1");

        ApiResponse<CreditRequestResponseDTO> body = response.getBody();
        assertNotNull(body);
        assertEquals("Credit request details", body.getMessage());
        assertEquals("cr1", body.getData().getId());

    }

    // ---------------- UPDATE ----------------

    @Test
    void update_shouldReturnUpdatedCreditRequest() {

        CreditRequestUpdateDTO req = updateReq();
        CreditRequestResponseDTO resDto = sampleResponse();
        resDto.setStatus(CreditStatus.APPROVED);
        resDto.setRemarks("Approved");

        when(creditService.updateStatus("cr1", req))
                .thenReturn(resDto);

        ResponseEntity<ApiResponse<CreditRequestResponseDTO>> response =
                creditRequestController.update("cr1", req);

        ApiResponse<CreditRequestResponseDTO> body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("Credit request updated", body.getMessage());
        assertEquals(CreditStatus.APPROVED,
                body.getData().getStatus());

    }
}
