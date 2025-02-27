package com.ictdemy.insurance_app.data.repositories;


import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.data.enums.PolicyStatus;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface InsuranceRepository extends JpaRepository<InsuranceEntity, Long> {
    List<InsuranceEntity> findByInsuredId(Long insuredId);
    List<InsuranceEntity> findByInsurerId(Long insurerId);
    long countByStatus(PolicyStatus status);
    long countByInsuranceType(String insuranceType);
}
