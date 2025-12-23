package com.service;

import com.document.User;
import com.dto.UserResponseDTO;

import com.enums.Role;
import com.exception.AdminStatusCannotbeChangedException;
import com.exception.UserNotFoundException;
import com.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    public UserResponseDTO updateUserStatus(String userId, Boolean active) {

        if (active == null) {
            throw new IllegalArgumentException("active field is required");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Optional for safety
        if (Role.ADMIN.equals(user.getRole())) {
            throw new AdminStatusCannotbeChangedException("Admin status cannot be modified");
        }

        user.setActive(active);
        userRepository.save(user);

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .active(user.isActive())
                .build();
    }
}
