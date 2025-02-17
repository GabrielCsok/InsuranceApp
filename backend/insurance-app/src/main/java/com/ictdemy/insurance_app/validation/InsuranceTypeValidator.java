package com.ictdemy.insurance_app.validation;

import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class InsuranceTypeValidator implements ConstraintValidator<ValidInsurance, InsuranceDTO> {

    @Override
    public void initialize(ValidInsurance constraintAnnotation) {

    }

    @Override
    public boolean isValid(InsuranceDTO insuranceDTO, ConstraintValidatorContext context) {
        if("personal".equalsIgnoreCase(insuranceDTO.getInsuranceType()) && insuranceDTO.getInsured() == null) {
            return false;
        }

        return true;
    }

}
