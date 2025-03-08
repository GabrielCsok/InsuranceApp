package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.data.enums.PolicyStatus;
import com.ictdemy.insurance_app.data.enums.Role;
import com.ictdemy.insurance_app.data.repositories.InsuranceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final InsuranceRepository insuranceRepository;

    public DashboardController(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Long>> getDashboardStats(Authentication authentication) {
        UserEntity currentUser = (UserEntity) authentication.getPrincipal();
        Map<String, Long> stats = new HashMap<>();

        if (currentUser.getRole() == Role.ADMIN) {
            stats.put("totalInsurances", insuranceRepository.count());
            stats.put("pending", insuranceRepository.countByStatus(PolicyStatus.PENDING));
            stats.put("approved", insuranceRepository.countByStatus(PolicyStatus.APPROVED));
            stats.put("denied", insuranceRepository.countByStatus(PolicyStatus.DENIED));
            stats.put("personal", insuranceRepository.countByInsuranceType("PERSONAL"));
            stats.put("house", insuranceRepository.countByInsuranceType("HOUSE"));
            stats.put("car", insuranceRepository.countByInsuranceType("CAR"));
        } else {
            Long userId = currentUser.getId();
            stats.put("totalInsurances", insuranceRepository.countByInsurerId(userId));
            stats.put("pending", insuranceRepository.countByStatusAndInsurerId(PolicyStatus.PENDING, userId));
            stats.put("approved", insuranceRepository.countByStatusAndInsurerId(PolicyStatus.APPROVED, userId));
            stats.put("denied", insuranceRepository.countByStatusAndInsurerId(PolicyStatus.DENIED, userId));
            stats.put("personal", insuranceRepository.countByInsuranceTypeAndInsurerId("PERSONAL", userId));
            stats.put("house", insuranceRepository.countByInsuranceTypeAndInsurerId("HOUSE", userId));
            stats.put("car", insuranceRepository.countByInsuranceTypeAndInsurerId("CAR", userId));
        }
        return ResponseEntity.ok(stats);
    }
}