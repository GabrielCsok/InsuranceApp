package com.ictdemy.insurance_app.data.repositories;

import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.data.enums.PolicyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * An interface that extends JpaRepository to retrieve insurance data from the database.
 */
public interface InsuranceRepository extends JpaRepository<InsuranceEntity, Long> {

    List<InsuranceEntity> findByInsuredId(Long insuredId);

    List<InsuranceEntity> findByInsurerId(Long insurerId);

    long countByStatus(PolicyStatus status);

    long countByInsuranceType(String insuranceType);

    long countByInsurerId(Long insurerId);

    long countByStatusAndInsurerId(PolicyStatus status, Long insurerId);

    long countByInsuranceTypeAndInsurerId(String insuranceType, Long insurerId);
}
