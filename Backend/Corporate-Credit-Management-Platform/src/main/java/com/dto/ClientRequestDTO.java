package com.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientRequestDTO {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Industry is required")
    private String industry;

    private String address;

    @Valid
    private PrimaryContactDTO primaryContact;

    @NotNull(message = "Annual turnover is required")
    @Positive(message = "Annual turnover must be positive")
    private Double annualTurnover;

    private boolean documentsSubmitted;
}