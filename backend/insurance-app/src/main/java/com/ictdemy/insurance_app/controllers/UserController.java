package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.data.repositories.InsuranceRepository;
import com.ictdemy.insurance_app.data.repositories.UserRepository;
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

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class  UserController {

    private final UserService userService;

    private final InsuranceRepository insuranceRepository;

    private final InsuranceMapper insuranceMapper;

    public UserController(UserService userService, InsuranceRepository insuranceRepository, InsuranceMapper insuranceMapper) {
        this.userService = userService;
        this.insuranceRepository = insuranceRepository;
        this.insuranceMapper = insuranceMapper;
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody @Valid UserDTO userDTO) {
            userService.create(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "User registered successfully"));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id,
                                              @RequestBody @Validated(UpdateGroup.class) UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");

    }

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
