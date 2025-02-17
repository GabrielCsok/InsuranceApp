package com.ictdemy.insurance_app.models.exceptions;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException() {
        super("Email already in use");
    }
}
