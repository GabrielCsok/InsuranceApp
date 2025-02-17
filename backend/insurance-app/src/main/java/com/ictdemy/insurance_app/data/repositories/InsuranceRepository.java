package com.ictdemy.insurance_app.data.repositories;


import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface InsuranceRepository extends JpaRepository<InsuranceEntity, Long> {
    List<InsuranceEntity> findByInsuredId(Long insuredId);
    List<InsuranceEntity> findByInsurerId(Long insurerId);
}
