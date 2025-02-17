package com.ictdemy.insurance_app.data.enums;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum Role {
    USER,
    ADMIN;


    //converting role to a GrantedAuthority
    public GrantedAuthority toAuthority() {
        return new SimpleGrantedAuthority("ROLE_" + this.name());
    }
}
