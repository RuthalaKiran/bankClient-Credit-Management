package com.exception;

public class AdminStatusCannotbeChangedException extends RuntimeException {
    public AdminStatusCannotbeChangedException(String message) {
        super(message);
    }
}
