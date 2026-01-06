package com.repository;

import com.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    /**
     * find user by email
     */
     Optional<User> findByEmail(String email);

    /**
     * checks if the user exists by role
     */
     boolean existsByRole(String role);
}
