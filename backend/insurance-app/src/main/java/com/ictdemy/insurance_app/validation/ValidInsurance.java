package com.ictdemy.insurance_app.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = InsuranceTypeValidator.class)
public @interface ValidInsurance {

    String message() default "Invalid insurance information";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
