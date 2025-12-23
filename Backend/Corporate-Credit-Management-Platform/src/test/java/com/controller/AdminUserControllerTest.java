package com.controller;

import com.dto.ApiResponse;
import com.dto.UpdateUserStatusRequest;
import com.dto.UserResponseDTO;
import com.enums.Role;
import com.service.AdminUserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminUserControllerTest {

    @Mock
    private AdminUserService adminUserService;

    @InjectMocks
    private AdminUserController adminUserController;

    @Test
    void updateUserStatus_shouldReturnUpdatedUser() {

        String userId = "123";

        UpdateUserStatusRequest req =
                new UpdateUserStatusRequest(false);

        UserResponseDTO userDto = UserResponseDTO.builder()
                .id(userId)
                .username("rm_john")
                .email("john@bank.com")
                .role(Role.RM)
                .active(false)
                .build();

        when(adminUserService.updateUserStatus(userId, false))
                .thenReturn(userDto);

        ResponseEntity<ApiResponse<UserResponseDTO>> response =
                adminUserController.updateUserStatus(userId, req);

        assertNotNull(response.getBody());

        ApiResponse<UserResponseDTO> body = response.getBody();

        assertTrue(body.isSuccess());
        assertEquals("User status updated successfully", body.getMessage());
        assertNotNull(body.getData());
        assertFalse(body.getData().isActive());

    }
}

