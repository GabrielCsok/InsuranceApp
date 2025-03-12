package com.ictdemy.insurance_app.models.exceptions;

public class PasswordDoNotEqualException extends RuntimeException {
    public PasswordDoNotEqualException() {
        super("The passwords do not match");
    }
}
