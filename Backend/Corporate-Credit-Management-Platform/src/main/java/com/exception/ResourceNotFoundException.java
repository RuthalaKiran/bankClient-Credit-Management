package com.exception;

/**
 * used to handle ResourceNotFoundException
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
