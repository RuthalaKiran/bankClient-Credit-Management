package com.config;

import com.security.CustomAccessDeniedHandler;
import com.security.CustomUserDetailsService;
import com.security.JwtAuthFilter;
import com.security.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * used to handle all the security rules and requestMatchers
 */
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint authEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;

    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_RM = "RM";
    public static final String ROLE_ANALYST = "ANALYST";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors->{})
                // disable CSRF
                .csrf(csrf -> csrf.disable())

                // stateless session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // for exception handling 403 and 401
                .exceptionHandling(ex->ex
                        .authenticationEntryPoint(authEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))

                // authorize endpoints
                .authorizeHttpRequests(auth -> auth

                        // public
                        .requestMatchers(
                                "/api/auth/login",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // admin
                        .requestMatchers("/api/auth/register").hasRole(ROLE_ADMIN)
                        .requestMatchers("/api/admin/**").hasRole(ROLE_ADMIN)
                        .requestMatchers("/api/users").hasRole(ROLE_ADMIN)

                        // RM only
                        .requestMatchers("/api/rm/**").hasRole(ROLE_RM)

                        // Credit requests
                        .requestMatchers(HttpMethod.POST, "/api/credit-requests").hasRole(ROLE_RM)
                        .requestMatchers(HttpMethod.PUT, "/api/credit-requests/**").hasRole(ROLE_ANALYST)
                        .requestMatchers(HttpMethod.GET, "/api/credit-requests/**").authenticated()

                        // everything else authenticated
                        .anyRequest().authenticated()
                )

                .authenticationProvider(authenticationProvider())
                // JWT filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                // "http://localhost:5173"
                //  "http://65.1.128.65:80"
                "*"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }


    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
