package com.config;


import com.document.User;
import com.enums.Role;
import com.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * used to create admin when the application starts
 */
@Configuration
@RequiredArgsConstructor
public class AdminBootstrapConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.password}")
    private String adminPassword;

    private static final Logger logger =
            LoggerFactory.getLogger(AdminBootstrapConfig.class);

    @Bean
    public CommandLineRunner bootstrapAdmin() {
        return args -> {

            boolean adminExists =
                    userRepository.existsByRole("ADMIN");

            if (!adminExists) {

                User admin = new User();
                admin.setUsername("Super Admin");
                admin.setEmail("admin@bank.com");
                admin.setPassword(
                        passwordEncoder.encode(adminPassword)
                );
                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                userRepository.save(admin);

                logger.info("Admin created at startup");

            }
        };
    }
}
