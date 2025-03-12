package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.models.dto.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * Controller responsible for user authentication
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * Authenticates a user using the provided login credentials.
     *
     * @param loginRequest contains the user's email and password.
     * @param request the HTTP request used to set the security context in the session.
     * @return a ResponseEntity containing a map with user details and a success message if authentication is successful,
     *         or an error message if authentication fails.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            request.getSession().setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext()
            );

            UserEntity userEntity = (UserEntity) authentication.getPrincipal();

            Map<String, Object> userData = Map.of(
                    "id", userEntity.getId(),
                    "name", userEntity.getFirstName() + " " + userEntity.getLastName(),
                    "email", userEntity.getEmail(),
                    "role", userEntity.getRole(),
                    "message", "Login successful"

            );

            return ResponseEntity.ok(userData);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
    }
}
