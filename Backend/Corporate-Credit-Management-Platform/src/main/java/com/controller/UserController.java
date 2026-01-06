package com.controller;

import com.dto.ApiResponse;
import com.dto.UserResponseDTO;
import com.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * handle user related endpoints
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    /**
     * get current user by jwt token endpoint
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getCurrentUser(){
        logger.info("Requested for get current user");
        UserResponseDTO userResponseDTO = userService.getCurrentUser();
        return ResponseEntity.ok().body(ApiResponse.success("Current user fetched successfully",userResponseDTO));
    }

    /**
     * used to fetch all the users endpoint
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUsers(){
        logger.info("Requested to fetch all users");
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(
                ApiResponse.success("Users fetched successfully", users)
        );
    }

}
