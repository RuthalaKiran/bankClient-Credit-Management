package com.controller;

import com.dto.ApiResponse;
import com.dto.ClientRequestDTO;
import com.dto.ClientResponseDTO;
import com.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * handle client related endpoints
 */
@RestController
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    /**
     * create client endpoint
     */
    @PostMapping("/api/rm/clients")
    public ResponseEntity<ApiResponse<ClientResponseDTO>> createClient(
            @Valid @RequestBody ClientRequestDTO request) {

        ClientResponseDTO clientResponseDTO = clientService.createClient(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Client created successfully",
                        clientResponseDTO
                ));
    }

    /**
     * used to get clients based on filtration
     * return own clients for rm and filtration endpoint
     */
    @GetMapping("/api/clients")
    public ResponseEntity<ApiResponse<List<ClientResponseDTO>>> getMyClients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String industry) {

        List<ClientResponseDTO> clientResponseDTOList = clientService.getMyClients(name, industry);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Clients fetched successfully",
                        clientResponseDTOList
                ) );
    }

    /**
     * get clients by id endpoint
     */
    @GetMapping("/api/clients/{id}")
    public ResponseEntity<ApiResponse<ClientResponseDTO>> getClientById(
            @PathVariable String id) {

        ClientResponseDTO clientResponseDTO = clientService.getClientById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Client details fetched",
                        clientResponseDTO
                )
        );
    }

    /**
     * update client endpoint
     */
    @PutMapping("/api/clients/{id}")
    public ResponseEntity<ApiResponse<ClientResponseDTO>> updateClient(
            @PathVariable String id,
            @Valid @RequestBody ClientRequestDTO request) {

        ClientResponseDTO clientResponseDTO = clientService.updateClient(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Client updated successfully",
                        clientResponseDTO
                )
        );
    }

    /**
     * get all clients for admin endpoint
     */
    @GetMapping("/api/admin/clients")
    public ResponseEntity<ApiResponse<List<ClientResponseDTO>>> getAllClientsAdmin(){
        List<ClientResponseDTO> clientResponseDTOList = clientService.getAllClientsForAdmin();

        return ResponseEntity.ok()
                .body(ApiResponse.success("Successfully fetched all the clients",clientResponseDTOList));
    }
}
