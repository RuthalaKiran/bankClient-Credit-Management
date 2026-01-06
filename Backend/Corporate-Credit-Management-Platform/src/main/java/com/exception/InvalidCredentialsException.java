package com.exception;

/**
 * used to handle InvalidCredentialsException
 */
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
