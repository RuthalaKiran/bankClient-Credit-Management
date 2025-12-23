package com.controller;

import com.dto.*;
import com.service.ClientService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClientControllerTest {

    @Mock
    private ClientService clientService;

    @InjectMocks
    private ClientController clientController;

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

    private ClientResponseDTO sampleResponse() {
        return ClientResponseDTO.builder()
                .id("c1")
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

    // ---------------- CREATE ----------------

    @Test
    void createClient_shouldReturnCreatedClient() {

        ClientRequestDTO req = sampleRequest();
        ClientResponseDTO resDto = sampleResponse();

        when(clientService.createClient(req)).thenReturn(resDto);

        ResponseEntity<ApiResponse<ClientResponseDTO>> response =
                clientController.createClient(req);

        ApiResponse<ClientResponseDTO> body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("Client created successfully", body.getMessage());
        assertEquals("ABC Ltd", body.getData().getCompanyName());

    }

    // ---------------- GET MY CLIENTS ----------------

    @Test
    void getMyClients_shouldReturnList() {

        List<ClientResponseDTO> list = List.of(sampleResponse());

        when(clientService.getMyClients(null, null)).thenReturn(list);

        ResponseEntity<ApiResponse<List<ClientResponseDTO>>> response =
                clientController.getMyClients(null, null);

        ApiResponse<List<ClientResponseDTO>> body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals(1, body.getData().size());

    }

    // ---------------- GET BY ID ----------------

    @Test
    void getClientById_shouldReturnClient() {

        ClientResponseDTO resDto = sampleResponse();

        when(clientService.getClientById("c1")).thenReturn(resDto);

        ResponseEntity<ApiResponse<ClientResponseDTO>> response =
                clientController.getClientById("c1");

        ApiResponse<ClientResponseDTO> body = response.getBody();
        assertNotNull(body);
        assertEquals("Client details fetched", body.getMessage());
        assertEquals("c1", body.getData().getId());

    }

    // ---------------- UPDATE ----------------

    @Test
    void updateClient_shouldReturnUpdatedClient() {

        ClientRequestDTO req = sampleRequest();
        ClientResponseDTO resDto = sampleResponse();
        resDto.setCompanyName("ABC Pvt Ltd");

        when(clientService.updateClient("c1", req)).thenReturn(resDto);

        ResponseEntity<ApiResponse<ClientResponseDTO>> response =
                clientController.updateClient("c1", req);

        ApiResponse<ClientResponseDTO> body = response.getBody();
        assertNotNull(body);
        assertEquals("Client updated successfully", body.getMessage());
        assertEquals("ABC Pvt Ltd", body.getData().getCompanyName());

    }

    // ---------------- ADMIN GET ALL ----------------

    @Test
    void getAllClientsAdmin_shouldReturnAllClients() {

        List<ClientResponseDTO> list =
                List.of(sampleResponse(), sampleResponse());

        when(clientService.getAllClientsForAdmin()).thenReturn(list);

        ResponseEntity<ApiResponse<List<ClientResponseDTO>>> response =
                clientController.getAllClientsAdmin();

        ApiResponse<List<ClientResponseDTO>> body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals(2, body.getData().size());
        assertEquals("Successfully fetched all the clients",
                body.getMessage());

    }
}
