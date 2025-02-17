package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import com.ictdemy.insurance_app.models.services.InsuranceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurances")
@CrossOrigin(origins = "http://localhost:5173")
public class InsuranceController {


    private final InsuranceService insuranceService;

    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    @GetMapping("/{id}")
    public InsuranceDTO getInsuranceById(@PathVariable Long id) {
        return insuranceService.getInsuranceById(id);
    }

    @PostMapping
    public ResponseEntity<String> createInsurance(@RequestBody @Valid InsuranceDTO insuranceDTO) {
        insuranceService.createInsurance(insuranceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Insurance created successfully");
    }

    @GetMapping
    public List<InsuranceDTO> getAllInsurances() {
        return insuranceService.getAllInsurances();
    }

    @PutMapping("/{id}")
    public ResponseEntity<InsuranceDTO> updateInsurance(@PathVariable("id") Long insuranceId,
                                                        @RequestBody @Valid InsuranceDTO insuranceDTO) {
        InsuranceDTO updatedInsurance = insuranceService.updateInsurance(insuranceId, insuranceDTO);
        return ResponseEntity.ok(updatedInsurance);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<InsuranceDTO> deleteInsurance(@PathVariable("id") Long id) {
        insuranceService.deleteInsurance(id);
        return ResponseEntity.noContent().build();
    }
}
