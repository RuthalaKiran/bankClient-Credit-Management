package com.dto;

import com.enums.CreditStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreditRequestResponseDTO {

    private String id;
    private String clientId;
    private String submittedBy;
    private Double requestAmount;
    private Integer tenureMonths;
    private String purpose;
    private CreditStatus status;
    private String remarks;
    private LocalDateTime createdAt;
}