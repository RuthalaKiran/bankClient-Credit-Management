package com.exception;

/**
 * used to handle AdminStatusCannotbeChangedException
 */
public class AdminStatusCannotbeChangedException extends RuntimeException {
    public AdminStatusCannotbeChangedException(String message) {
        super(message);
    }
}
