package com.ictdemy.insurance_app.models.exceptions;

public class InsuranceNotFoundException extends RuntimeException {
  public InsuranceNotFoundException(Long id) {
    super("Insurance not found with id: " + id);
  }
}
