package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.data.repositories.InsuranceRepository;
import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import com.ictdemy.insurance_app.models.dto.UserDTO;
import com.ictdemy.insurance_app.models.dto.mappers.InsuranceMapper;
import com.ictdemy.insurance_app.models.services.UserService;
import com.ictdemy.insurance_app.models.validation.UpdateGroup;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Controller responsible for handling all operations related to users.
 * Provides endpoints to create, retrieve, update, and delete user records.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class  UserController {

    private final UserService userService;

    private final InsuranceRepository insuranceRepository;

    private final InsuranceMapper insuranceMapper;

    /**
     * Constructor for UserController, injecting required dependencies.
     *
     * @param userService the service to manage user operations.
     * @param insuranceRepository the repository for insurance data.
     * @param insuranceMapper the mapper for converting between InsuranceEntity and InsuranceDTO.
     */
    public UserController(UserService userService, InsuranceRepository insuranceRepository, InsuranceMapper insuranceMapper) {
        this.userService = userService;
        this.insuranceRepository = insuranceRepository;
        this.insuranceMapper = insuranceMapper;
    }

    /**
     * Retrieves a user record by its ID.
     *
     * @param id the ID of the user to retrieve.
     * @return a UserDTO representing the user.
     */
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * Creates a new user from the provided UserDTO.
     * The DTO is validated before creation.
     *
     * @param userDTO a validated UserDTO object containing user data.
     * @return a ResponseEntity containing the HTTP status of CREATED and a message indicating successful registration.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody @Valid UserDTO userDTO) {
            userService.create(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "User registered successfully"));
    }

    /**
     * Updates an existing user with new data.
     * Uses a validation group (UpdateGroup) so that only relevant validations are applied.
     *
     * @param id   the id of the user to update.
     * @param userDTO  a validated UserDTO containing the updated data.
     * @return a ResponseEntity containing the updated UserDTO.
     */
    @PutMapping("/{id}/edit")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id,
                                              @RequestBody @Validated(UpdateGroup.class) UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Retrieves all user records.
     *
     * @return a ResponseEntity object containing a List of UserDTO objects representing all insurances.
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Deletes a user record by its id.
     *
     * @param id the id of the user record to delete.
     * @return a ResponseEntity with a message indicating a successful deletion.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");

        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves a list of insurances associated with a given user.
     * This method fetches insurances where the user is either the insured or the insurer,
     * merges the results to remove duplicates, and converts them to DTOs.
     *
     * @param id the id of the user whose insurances are to be retrieved.
     * @return ResponseEntity containing the List of InsuranceDTO objects.
     */
    @GetMapping("/{id}/insurances")
    public ResponseEntity<List<InsuranceDTO>> getUserInsurances(@PathVariable Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Current Authentication: " + auth);

        if (auth != null) {
            System.out.println("Authenticated username: " + auth.getName());
            System.out.println("Authorities: " + auth.getAuthorities());
        } else {
            System.out.println("No authentication found!");
        }

        List<InsuranceEntity> insuredList = insuranceRepository.findByInsuredId(id);

        List<InsuranceEntity> insurerList = insuranceRepository.findByInsurerId(id);

        Set<InsuranceEntity> merged = new HashSet<>();
        merged.addAll(insuredList);
        merged.addAll(insurerList);

        List<InsuranceDTO> insuranceDTOs = merged.stream()
                .map(insuranceMapper::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(insuranceDTOs);
    }
}
