package com.hospital.appointment.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class DoctorRequest {
    @NotBlank @Size(max = 100)
    private String name;
    @NotBlank @Size(max = 100)
    private String specialization;
    @NotBlank @Email @Size(max = 120)
    private String email;
    @NotNull @DecimalMin("0.0")
    private BigDecimal consultationFee;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public BigDecimal getConsultationFee() { return consultationFee; }
    public void setConsultationFee(BigDecimal consultationFee) { this.consultationFee = consultationFee; }
}
