package com.exception;

/**
 * used to handle account deactivation
 */
public class AccountDeactivatedException extends RuntimeException {
    public AccountDeactivatedException(String message) {
        super(message);
    }
}
