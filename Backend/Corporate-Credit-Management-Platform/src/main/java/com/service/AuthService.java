package com.service;

import com.document.User;
import com.dto.*;
import com.exception.AccountDeactivatedException;
import com.exception.InvalidCredentialsException;
import com.repository.UserRepository;
import com.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    // ADMIN creates RM / ANALYST
    public ApiResponse<String> register(RegisterRequestDTO req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return new ApiResponse<>(false,
                    "Email already exists", null);
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(req.getRole());
        user.setActive(true);

        userRepo.save(user);

        return new ApiResponse<>(true,
                "User created successfully", null);
    }

    // LOGIN
    public ApiResponse<AuthDataDTO> login(LoginRequestDTO req) {

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid credentials"));

        if (!user.isActive()) {
            throw new AccountDeactivatedException("Account is deactivated");
        }

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        String token =
                jwtService.generateToken(user);

        UserResponseDTO dto = new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.isActive()
        );

        AuthDataDTO data =
                new AuthDataDTO(token, user.getRole(), dto);

        return new ApiResponse<>(true, "Login successful", data);
    }
}
