package com.exception;

/**
 * used to handle ClientNotFoundException
 */
public class ClientNotFoundException extends RuntimeException {
    public ClientNotFoundException(String message) {
        super(message);
    }
}
