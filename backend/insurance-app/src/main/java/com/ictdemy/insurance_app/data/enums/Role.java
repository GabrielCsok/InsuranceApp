package com.ictdemy.insurance_app.data.enums;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * Enum class representing user roles.
 */
public enum Role {
    USER,
    ADMIN;

    /**
     * Converts a role enum into a GrantedAuthority object.
     * @return GrantedAuthority object.
     */
    public GrantedAuthority toAuthority() {
        return new SimpleGrantedAuthority("ROLE_" + this.name());
    }
}
