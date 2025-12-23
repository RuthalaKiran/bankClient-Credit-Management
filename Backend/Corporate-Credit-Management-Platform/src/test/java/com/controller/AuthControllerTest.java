package com.controller;

import com.dto.*;
import com.enums.Role;
import com.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    // ---------------- REGISTER ----------------

    @Test
    void register_shouldReturnSuccessResponse() {

        RegisterRequestDTO req = new RegisterRequestDTO(
                "john",
                "john@bank.com",
                "password123",
                Role.RM
        );

        ApiResponse<String> serviceRes =
                new ApiResponse<>(true, "User created successfully", null);

        when(authService.register(req)).thenReturn(serviceRes);

        ResponseEntity<ApiResponse<String>> response =
                authController.register(req);

        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("User created successfully",
                response.getBody().getMessage());
        assertNull(response.getBody().getData());

    }

    // ---------------- LOGIN ----------------

    @Test
    void login_shouldReturnTokenAndUser() {

        LoginRequestDTO req =
                new LoginRequestDTO("john@bank.com", "password123");

        UserResponseDTO userDto = UserResponseDTO.builder()
                .id("123")
                .username("john")
                .email("john@bank.com")
                .role(Role.RM)
                .active(true)
                .build();

        AuthDataDTO data =
                new AuthDataDTO("jwt-token", Role.RM, userDto);

        ApiResponse<AuthDataDTO> serviceRes =
                new ApiResponse<>(true, "Login successful", data);

        when(authService.login(req)).thenReturn(serviceRes);

        ResponseEntity<ApiResponse<AuthDataDTO>> response =
                authController.login(req);

        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Login successful",
                response.getBody().getMessage());
        assertEquals("jwt-token",
                response.getBody().getData().getToken());
        assertEquals("john@bank.com",
                response.getBody().getData().getUser().getEmail());

    }
}
