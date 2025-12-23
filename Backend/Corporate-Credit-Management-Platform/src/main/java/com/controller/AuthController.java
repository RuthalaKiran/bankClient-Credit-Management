package com.controller;

import com.dto.ApiResponse;
import com.dto.AuthDataDTO;
import com.dto.LoginRequestDTO;
import com.dto.RegisterRequestDTO;
import com.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid
            @RequestBody RegisterRequestDTO request) {
        logger.info("Requested for register {}", request);
        ApiResponse<String> apiResponse = authService.register(request);
        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDataDTO>> login(@Valid
            @RequestBody LoginRequestDTO request) {
        logger.info("Requested for login {}", request);
        ApiResponse<AuthDataDTO> apiResponse = authService.login(request);
        return ResponseEntity.ok().body(apiResponse);
    }
}
