package com.service;

import com.document.User;
import com.dto.UserResponseDTO;
import com.enums.Role;
import com.exception.AdminStatusCannotbeChangedException;
import com.exception.UserNotFoundException;
import com.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminUserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AdminUserService adminUserService;

    @Test
    void updateUserStatus_shouldUpdate_whenValidUserAndStatus() {

        User user = User.builder()
                .id("123")
                .username("rm_john")
                .email("john@bank.com")
                .role(Role.RM)
                .active(true)
                .build();

        when(userRepository.findById("123"))
                .thenReturn(Optional.of(user));

        UserResponseDTO res =
                adminUserService.updateUserStatus("123", false);

        assertNotNull(res);
        assertEquals("123", res.getId());
        assertFalse(res.isActive());
        assertEquals(Role.RM, res.getRole());

    }

    @Test
    void updateUserStatus_shouldThrow_whenActiveIsNull() {

        assertThrows(
                IllegalArgumentException.class,
                () -> adminUserService.updateUserStatus("123", null)
        );

    }

    @Test
    void updateUserStatus_shouldThrow_whenUserNotFound() {

        when(userRepository.findById("123"))
                .thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class,
                () -> adminUserService.updateUserStatus("123", true));

    }

    @Test
    void updateUserStatus_shouldThrow_whenUserIsAdmin() {

        User admin = User.builder()
                .id("1")
                .username("admin")
                .email("admin@bank.com")
                .role(Role.ADMIN)
                .active(true)
                .build();

        when(userRepository.findById("1"))
                .thenReturn(Optional.of(admin));

        assertThrows(AdminStatusCannotbeChangedException.class,
                () -> adminUserService.updateUserStatus("1", false));

    }
}
