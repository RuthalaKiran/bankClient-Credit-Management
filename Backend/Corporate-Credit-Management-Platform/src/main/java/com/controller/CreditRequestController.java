package com.controller;

import com.dto.ApiResponse;
import com.dto.CreditRequestCreateDTO;
import com.dto.CreditRequestResponseDTO;
import com.dto.CreditRequestUpdateDTO;
import com.service.CreditRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/credit-requests")
public class CreditRequestController {

    private final CreditRequestService creditService;

    // CREATE — RM ONLY
    @PostMapping
    public ResponseEntity<ApiResponse<CreditRequestResponseDTO>> create(
            @Valid @RequestBody CreditRequestCreateDTO request) {

        CreditRequestResponseDTO creditRequestResponseDTO = creditService.createCreditRequest(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Credit request created",
                        creditRequestResponseDTO
                ));
    }


    // GET — RM (own) / ANALYST (all)
    @GetMapping
    public ResponseEntity<ApiResponse<List<CreditRequestResponseDTO>>> getAll() {
        List<CreditRequestResponseDTO> creditRequestResponseDTOList = creditService.getCreditRequests();
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Credit requests fetched",
                        creditRequestResponseDTOList
                )
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CreditRequestResponseDTO>> getById(
            @PathVariable String id) {
        CreditRequestResponseDTO creditRequestResponseDTO = creditService.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Credit request details",
                        creditRequestResponseDTO
                )
        );
    }


    // UPDATE — ANALYST ONLY
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CreditRequestResponseDTO>> update(
            @PathVariable String id,
            @Valid @RequestBody CreditRequestUpdateDTO request) {
    CreditRequestResponseDTO creditRequestResponseDTO = creditService.updateStatus(id, request);
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Credit request updated",
                        creditRequestResponseDTO
                )
        );
    }
}
