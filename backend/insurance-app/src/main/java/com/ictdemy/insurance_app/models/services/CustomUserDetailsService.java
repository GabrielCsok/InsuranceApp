package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.data.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * Custom implementation of UserDetailsService to load user-specific data.
 * This service retrieves a user by email from the repository.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads a user by email for authentication purposes.
     *
     * @param email the email of the user.
     * @return a UserDetails object representing the user.
     * @throws UsernameNotFoundException if no user with the provided email is found.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(email));

        return userEntity;
    }
}
