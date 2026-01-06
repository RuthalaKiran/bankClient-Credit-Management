package com.exception;

/**
 * used to handle UserNotFoundException
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
