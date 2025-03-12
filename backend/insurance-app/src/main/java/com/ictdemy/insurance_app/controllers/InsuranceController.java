package com.ictdemy.insurance_app.controllers;

import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import com.ictdemy.insurance_app.models.services.InsuranceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controller responsible for handling all operations related to insurances.
 * Provides endpoints to create, retrieve, update, and delete insurance records.
 */
@RestController
@RequestMapping("/api/insurances")
@CrossOrigin(origins = "http://localhost:5173")
public class InsuranceController {

    private final InsuranceService insuranceService;

    /**
     * Constructor for InsuranceController, with dependency injection of the InsuranceService.
     *
     * @param insuranceService the service to manage insurance operations.
     */
    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    /**
     * Retrieves an insurance record by its ID.
     *
     * @param id the ID of the insurance to retrieve.
     * @return the InsuranceDTO representing the insurance record.
     */
    @GetMapping("/{id}")
    public InsuranceDTO getInsuranceById(@PathVariable Long id) {
        return insuranceService.getInsuranceById(id);
    }


    /**
     * Creates a new insurance record from the provided InsuranceDTO.
     * The DTO is validated before creation.
     *
     * @param insuranceDTO a validated InsuranceDTO object containing insurance data.
     * @return a ResponseEntity containing the created InsuranceDTO and an HTTP status of CREATED.
     */
    @PostMapping
    public ResponseEntity<InsuranceDTO> createInsurance(@RequestBody @Valid InsuranceDTO insuranceDTO) {
        InsuranceDTO createdInsurance = insuranceService.createInsurance(insuranceDTO);
        return new ResponseEntity<>(createdInsurance, HttpStatus.CREATED);


    }

    /**
     * Retrieves all insurance records.
     *
     * @return a List of InsuranceDTO objects representing all insurances.
     */
    @GetMapping
    public List<InsuranceDTO> getAllInsurances() {
        return insuranceService.getAllInsurances();
    }

    /**
     * Updates an existing insurance record with new data.
     * The insurance to update is identified by its ID, and the new data is provided in a validated InsuranceDTO.
     *
     * @param insuranceId   the ID of the insurance record to update.
     * @param insuranceDTO  a validated InsuranceDTO containing the updated data.
     * @return a ResponseEntity containing the updated InsuranceDTO.
     */
    @PutMapping("/{id}/update")
    public ResponseEntity<InsuranceDTO> updateInsurance(@PathVariable("id") Long insuranceId,
                                                        @RequestBody @Valid InsuranceDTO insuranceDTO) {
        InsuranceDTO updatedInsurance = insuranceService.updateInsurance(insuranceId, insuranceDTO);
        return ResponseEntity.ok(updatedInsurance);

    }

    /**
     * Deletes an insurance record by its ID.
     *
     * @param id the ID of the insurance record to delete.
     * @return a ResponseEntity with no content, indicating successful deletion.
     */
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<InsuranceDTO> deleteInsurance(@PathVariable("id") Long id) {
        insuranceService.deleteInsurance(id);
        return ResponseEntity.noContent().build();
    }
}
