package com.dto;

import com.enums.CreditStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreditRequestUpdateDTO {

    @NotNull(message = "Status is required")
    private CreditStatus status;

    @NotBlank(message = "Remarks are required")
    private String remarks;
}
