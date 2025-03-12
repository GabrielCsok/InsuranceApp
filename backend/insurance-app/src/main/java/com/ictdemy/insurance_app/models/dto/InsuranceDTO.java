package com.ictdemy.insurance_app.models.dto;

import com.ictdemy.insurance_app.data.enums.PolicyStatus;
import java.time.LocalDate;

/**
 * A class representing Insurances as objects
 */
public class InsuranceDTO {
    private Long id;

    private String insuranceType;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double coverageAmount;

    private Double premiumAmount;

    private PolicyStatus status;

    private UserDTO insured;

    private UserDTO insurer;

    private String houseAddress;

    private String carRegistration;

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

    public UserDTO getInsured() {
        return insured;
    }

    public void setInsured(UserDTO insured) {
        this.insured = insured;
    }

    public UserDTO getInsurer() {
        return insurer;
    }

    public void setInsurer(UserDTO insurer) {
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
}
