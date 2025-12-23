package com.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreditRequestCreateDTO {

    @NotBlank(message = "Client ID is required")
    private String clientId;

    @NotNull(message = "Request amount is required")
    @Positive(message = "Request amount must be positive")
    private Double requestAmount;

    @NotNull(message = "Tenure is required")
    @Positive(message = "Tenure must be positive")
    private Integer tenureMonths;

    @NotBlank(message = "Purpose is required")
    private String purpose;
}
