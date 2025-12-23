package com.controller;

import com.dto.ApiResponse;
import com.dto.UserResponseDTO;
import com.enums.Role;
import com.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    void getCurrentUser_shouldReturnCurrentUser() {

        UserResponseDTO userDto = UserResponseDTO.builder()
                .id("123")
                .username("john")
                .email("john@bank.com")
                .role(Role.RM)
                .active(true)
                .build();

        when(userService.getCurrentUser()).thenReturn(userDto);

        ResponseEntity<ApiResponse<UserResponseDTO>> response =
                userController.getCurrentUser();

        assertNotNull(response.getBody());

        ApiResponse<UserResponseDTO> body = response.getBody();

        assertTrue(body.isSuccess());
        assertEquals("Current user fetched successfully", body.getMessage());
        assertNotNull(body.getData());
        assertEquals("john@bank.com", body.getData().getEmail());

    }
}
