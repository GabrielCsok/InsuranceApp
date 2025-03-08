package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import com.ictdemy.insurance_app.models.services.InsuranceService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<InsuranceDTO> createInsurance(@RequestBody @Valid InsuranceDTO insuranceDTO) {
        InsuranceDTO createdInsurance = insuranceService.createInsurance(insuranceDTO);
        return new ResponseEntity<>(createdInsurance, HttpStatus.CREATED);

    }

    @GetMapping
    public List<InsuranceDTO> getAllInsurances() {
        return insuranceService.getAllInsurances();
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<InsuranceDTO> updateInsurance(@PathVariable("id") Long insuranceId,
                                                        @RequestBody @Valid InsuranceDTO insuranceDTO) {
        InsuranceDTO updatedInsurance = insuranceService.updateInsurance(insuranceId, insuranceDTO);
        return ResponseEntity.ok(updatedInsurance);

    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<InsuranceDTO> deleteInsurance(@PathVariable("id") Long id) {
        insuranceService.deleteInsurance(id);
        return ResponseEntity.noContent().build();
    }
}
