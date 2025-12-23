package com.service;

import com.document.User;
import com.dto.*;
import com.enums.Role;
import com.exception.AccountDeactivatedException;
import com.exception.InvalidCredentialsException;
import com.repository.UserRepository;
import com.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepo;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    //  register tests

    @Test
    void register_shouldCreateUser_whenEmailNotExists() {

        RegisterRequestDTO req = new RegisterRequestDTO(
                "john",
                "john@bank.com",
                "password123",
                Role.RM
        );

        when(userRepo.findByEmail(req.getEmail()))
                .thenReturn(Optional.empty());
        when(encoder.encode(req.getPassword()))
                .thenReturn("hashedPass");

        ApiResponse<String> res = authService.register(req);

        assertTrue(res.isSuccess());
        assertEquals("User created successfully", res.getMessage());
        assertNull(res.getData());

    }

    @Test
    void register_shouldFail_whenEmailAlreadyExists() {

        RegisterRequestDTO req = new RegisterRequestDTO(
                "john",
                "john@bank.com",
                "password123",
                Role.RM
        );

        when(userRepo.findByEmail(req.getEmail()))
                .thenReturn(Optional.of(new User()));

        ApiResponse<String> res = authService.register(req);

        assertFalse(res.isSuccess());
        assertEquals("Email already exists", res.getMessage());
        assertNull(res.getData());

    }


    //  login tests
    @Test
    void login_shouldSucceed_withValidCredentials() {

        LoginRequestDTO req = new LoginRequestDTO(
                "john@bank.com",
                "password123"
        );

        User user = User.builder()
                .id("123")
                .username("john")
                .email("john@bank.com")
                .password("hashedPass")
                .role(Role.RM)
                .active(true)
                .build();

        when(userRepo.findByEmail(req.getEmail()))
                .thenReturn(Optional.of(user));
        when(encoder.matches(req.getPassword(), user.getPassword()))
                .thenReturn(true);
        when(jwtService.generateToken(user))
                .thenReturn("jwt-token");

        ApiResponse<AuthDataDTO> res = authService.login(req);

        assertTrue(res.isSuccess());
        assertEquals("Login successful", res.getMessage());
        assertNotNull(res.getData());

        AuthDataDTO data = res.getData();
        assertEquals("jwt-token", data.getToken());
        assertEquals(Role.RM, data.getRole());
        assertEquals("john@bank.com", data.getUser().getEmail());

    }

    @Test
    void login_shouldThrow_whenEmailNotFound() {

        LoginRequestDTO req = new LoginRequestDTO(
                "john@bank.com",
                "password123"
        );

        when(userRepo.findByEmail(req.getEmail()))
                .thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class,
                () -> authService.login(req));

    }

    @Test
    void login_shouldThrow_whenPasswordIsWrong() {

        LoginRequestDTO req = new LoginRequestDTO(
                "john@bank.com",
                "wrongPass"
        );

        User user = User.builder()
                .id("123")
                .username("john")
                .email("john@bank.com")
                .password("hashedPass")
                .role(Role.RM)
                .active(true)
                .build();

        when(userRepo.findByEmail(req.getEmail()))
                .thenReturn(Optional.of(user));
        when(encoder.matches(req.getPassword(), user.getPassword()))
                .thenReturn(false);

        assertThrows(InvalidCredentialsException.class,
                () -> authService.login(req));

    }

    @Test
    void login_shouldThrow_whenAccountIsDeactivated() {

        LoginRequestDTO req = new LoginRequestDTO(
                "john@bank.com",
                "password123"
        );

        User user = User.builder()
                .id("123")
                .username("john")
                .email("john@bank.com")
                .password("hashedPass")
                .role(Role.RM)
                .active(false)
                .build();

        when(userRepo.findByEmail(req.getEmail()))
                .thenReturn(Optional.of(user));

        assertThrows(AccountDeactivatedException.class,
                () -> authService.login(req));

    }
}
