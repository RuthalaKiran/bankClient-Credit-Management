package com.controller;

import com.dto.ApiResponse;
import com.dto.UpdateUserStatusRequest;
import com.dto.UserResponseDTO;
import com.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * handle admin related endpoints
 */
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    private final Logger logger = LoggerFactory.getLogger(AdminUserController.class);

    /**
     * update user status endpoint
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserStatus(
            @Valid
            @PathVariable("id") String id,
            @RequestBody UpdateUserStatusRequest request) {
        logger.info("Requested for change active for id {} and active is : {}", id,request.getActive());
        UserResponseDTO updatedUser =
                adminUserService.updateUserStatus(id, request.getActive());

        return ResponseEntity.ok(
                ApiResponse.success(
                        "User status updated successfully",
                        updatedUser
                )
        );
    }
}
