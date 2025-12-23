package com.service;

import com.document.User;
import com.dto.UserResponseDTO;
import com.enums.Role;
import com.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @BeforeEach
    void setUp() {
        // Mock SecurityContextHolder
        SecurityContextHolder.setContext(securityContext);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void getCurrentUser_shouldReturnUser_whenUserExists() {

        String email = "john@bank.com";

        User user = User.builder()
                .id("123")
                .username("john")
                .email(email)
                .role(Role.RM)
                .active(true)
                .build();

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(email);
        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        UserResponseDTO res = userService.getCurrentUser();

        assertNotNull(res);
        assertEquals("123", res.getId());
        assertEquals("john", res.getUsername());
        assertEquals(email, res.getEmail());
        assertEquals(Role.RM, res.getRole());
        assertTrue(res.isActive());

    }

    @Test
    void getCurrentUser_shouldThrow_whenUserNotFound() {

        String email = "john@bank.com";

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(email);
        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.getCurrentUser());

        assertEquals("User not found", ex.getMessage());
    }
}
