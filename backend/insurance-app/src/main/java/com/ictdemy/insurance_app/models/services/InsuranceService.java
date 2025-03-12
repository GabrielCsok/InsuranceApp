package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import java.util.List;

/**
 * Service interface for managing insurance data.
 * Provides methods to create, retrieve, update, and delete insurance records.
 */
public interface InsuranceService {

    InsuranceDTO createInsurance(InsuranceDTO insuranceDTO);

    InsuranceDTO getInsuranceById(Long id);

    List<InsuranceDTO> getAllInsurances();

    InsuranceDTO updateInsurance(Long id, InsuranceDTO insuranceDTO);

    void deleteInsurance(Long id);
}
