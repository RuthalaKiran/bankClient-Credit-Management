package com.dto;

import com.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthDataDTO {
    private String token;
    private Role role;
    private UserResponseDTO user;
}

