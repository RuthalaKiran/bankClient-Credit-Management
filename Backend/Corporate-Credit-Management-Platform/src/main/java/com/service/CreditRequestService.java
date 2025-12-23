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
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreditRequestService {

    private final CreditRequestRepository creditRepo;
    private final JwtService jwtService;
    private final HttpServletRequest request;

    private static final String CREDIT_NOT_FOUND =
            "Credit request not found";



    // helper get rmId from the token
    private String extractUserIdFromToken() {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        return jwtService.extractUserId(token);
    }

    // create credit request by rm
    public CreditRequestResponseDTO createCreditRequest(
            CreditRequestCreateDTO dto) {

        String rmId = extractUserIdFromToken();

        CreditRequest credit = CreditRequest.builder()
                .clientId(dto.getClientId())
                .submittedBy(rmId)
                .requestAmount(dto.getRequestAmount())
                .tenureMonths(dto.getTenureMonths())
                .purpose(dto.getPurpose())
                .status(CreditStatus.PENDING)
                .remarks("")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return mapToResponse(creditRepo.save(credit));
    }

    // get credit requests if rm show only own if analyst show all
    public List<CreditRequestResponseDTO> getCreditRequests() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        boolean isAnalyst = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ANALYST"));

        List<CreditRequest> requests;

        if (isAnalyst) {
            requests = creditRepo.findAll();
        } else {
            String rmId = extractUserIdFromToken();
            requests = creditRepo.findBySubmittedBy(rmId);
        }

        return requests.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // get by id
    public CreditRequestResponseDTO getById(String id) {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        boolean isAnalyst = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ANALYST"));

        CreditRequest credit;

        if (isAnalyst) {
            credit = creditRepo.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(CREDIT_NOT_FOUND));
        } else {
            String rmId = extractUserIdFromToken();
            credit = creditRepo.findByIdAndSubmittedBy(id, rmId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(CREDIT_NOT_FOUND));
        }

        return mapToResponse(credit);
    }

    // update credit request by only analyst
    public CreditRequestResponseDTO updateStatus(
            String id, CreditRequestUpdateDTO dto) {

        CreditRequest credit = creditRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(CREDIT_NOT_FOUND));

        credit.setStatus(dto.getStatus());
        credit.setRemarks(dto.getRemarks());
        credit.setUpdatedAt(LocalDateTime.now());

        return mapToResponse(creditRepo.save(credit));
    }

    // dto for credit request response
    private CreditRequestResponseDTO mapToResponse(CreditRequest credit) {
        return CreditRequestResponseDTO.builder()
                .id(credit.getId())
                .clientId(credit.getClientId())
                .submittedBy(credit.getSubmittedBy())
                .requestAmount(credit.getRequestAmount())
                .tenureMonths(credit.getTenureMonths())
                .purpose(credit.getPurpose())
                .status(credit.getStatus())
                .remarks(credit.getRemarks())
                .createdAt(credit.getCreatedAt())
                .build();
    }

}
