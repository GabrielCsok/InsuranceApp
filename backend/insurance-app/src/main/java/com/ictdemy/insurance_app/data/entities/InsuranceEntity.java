package com.ictdemy.insurance_app.data.entities;

import com.ictdemy.insurance_app.data.enums.PolicyStatus;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class InsuranceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String insuranceType;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Double coverageAmount;

    private Double premiumAmount;

    @Enumerated(EnumType.STRING)
    private PolicyStatus status;

    @ManyToOne
    @JoinColumn(name = "insured_id", nullable = true)
    private UserEntity insured;

    @ManyToOne
    @JoinColumn(name = "insurer_id", nullable = false)
    private UserEntity insurer;

    @Column(nullable = true)
    private String houseAddress;

    @Column(nullable = true)
    private String carRegistration;

    @ManyToOne
    @JoinColumn(name = "approved_by_admin_id")
    private UserEntity approvedByAdmin;

    //getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(Double coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public Double getPremiumAmount() {
        return premiumAmount;
    }

    public void setPremiumAmount(Double premiumAmount) {
        this.premiumAmount = premiumAmount;
    }

    public PolicyStatus getStatus() {
        return status;
    }

    public void setStatus(PolicyStatus status) {
        this.status = status;
    }

    public UserEntity getInsured() {
        return insured;
    }

    public void setInsured(UserEntity insured) {
        this.insured = insured;
    }

    public UserEntity getInsurer() {
        return insurer;
    }

    public void setInsurer(UserEntity insurer) {
        this.insurer = insurer;
    }

    public String getHouseAddress() {
        return houseAddress;
    }

    public void setHouseAddress(String houseAddress) {
        this.houseAddress = houseAddress;
    }

    public String getCarRegistration() {
        return carRegistration;
    }

    public void setCarRegistration(String carRegistration) {
        this.carRegistration = carRegistration;
    }

    public UserEntity getApprovedByAdmin() {
        return approvedByAdmin;
    }

    public void setApprovedByAdmin(UserEntity approvedByAdmin) {
        this.approvedByAdmin = approvedByAdmin;
    }
}
