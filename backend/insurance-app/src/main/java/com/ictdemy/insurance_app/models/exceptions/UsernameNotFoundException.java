package com.ictdemy.insurance_app.models.exceptions;

public class UsernameNotFoundException extends RuntimeException {
    public UsernameNotFoundException(String email) {
        super("User not found with email: " + email);
    }
}
