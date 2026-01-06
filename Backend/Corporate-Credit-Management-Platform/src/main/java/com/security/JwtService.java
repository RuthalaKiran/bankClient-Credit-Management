package com.security;

import com.document.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

/**
 * contains all jwt service methods
 */
@Service
public class JwtService {

    private final Key key;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expirationMs) {

        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMs = expirationMs;
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .claim("userId",user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return parse(token).getBody().getSubject();
    }

    public String extractUserId(String token) {
        return parse(token).getBody().get("userId", String.class);
    }

    public String extractRole(String token) {
        return parse(token).getBody().get("role", String.class);
    }


    public boolean isTokenValid(String token, String email) {
        return extractEmail(token).equals(email)
                && !isExpired(token);
    }

    private boolean isExpired(String token) {
        return parse(token).getBody()
                .getExpiration()
                .before(new Date());
    }

    private Jws<Claims> parse(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
