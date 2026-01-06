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

/**
 * handle credit requests related endpoints
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/credit-requests")
public class CreditRequestController {

    private final CreditRequestService creditService;

    /**
     * create credit request only by RM endpoint
     */
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


    /**
     * used to get own credit requests if RM else all credit requests for ANALYST endpoint
     */
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

    /**
     * get credit request by id endpoint
     */
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


    /**
     * update credit request only by the ANALYST endpoint
     */
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
