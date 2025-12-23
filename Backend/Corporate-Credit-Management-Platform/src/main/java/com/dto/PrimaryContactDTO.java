package com.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PrimaryContactDTO {

    @NotBlank(message = "Contact name is required")
    private String name;

    @Email(message = "Invalid contact email")
    @NotBlank(message = "Contact email is required")
    private String email;

    @Pattern(
            regexp = "\\d{10}",
            message = "Phone number must be 10 digits"
    )
    private String phone;
}
