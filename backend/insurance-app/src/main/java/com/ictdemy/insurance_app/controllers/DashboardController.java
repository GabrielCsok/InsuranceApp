package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.data.enums.PolicyStatus;
import com.ictdemy.insurance_app.data.repositories.InsuranceRepository;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        long totalInsurances = insuranceRepository.count();
        long pending = insuranceRepository.countByStatus(PolicyStatus.PENDING);
        long approved = insuranceRepository.countByStatus(PolicyStatus.APPROVED);
        long denied = insuranceRepository.countByStatus(PolicyStatus.DENIED);

        long personal = insuranceRepository.countByInsuranceType("PERSONAL");
        long house = insuranceRepository.countByInsuranceType("HOUSE");
        long car = insuranceRepository.countByInsuranceType("CAR");

        Map<String, Long> stats = new HashMap<>();
        stats.put("totalInsurances", totalInsurances);
        stats.put("pending", pending);
        stats.put("approved", approved);
        stats.put("denied", denied);
        stats.put("personal", personal);
        stats.put("house", house);
        stats.put("car", car);

        return ResponseEntity.ok(stats);
    }
}
