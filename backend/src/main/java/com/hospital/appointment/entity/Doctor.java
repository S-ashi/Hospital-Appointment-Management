package com.hospital.appointment.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "DOCTOR")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DOCTOR_ID")
    private Long id;

    @Column(name = "DOCTOR_NAME", nullable = false, length = 100)
    private String name;

    @Column(name = "SPECIALIZATION", nullable = false, length = 100)
    private String specialization;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 120)
    private String email;

    @Column(name = "CONSULTATION_FEE", nullable = false, precision = 10, scale = 2)
    private BigDecimal consultationFee;

    public Doctor() {}

    public Doctor(String name, String specialization, String email, BigDecimal consultationFee) {
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.consultationFee = consultationFee;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public BigDecimal getConsultationFee() { return consultationFee; }
    public void setConsultationFee(BigDecimal consultationFee) { this.consultationFee = consultationFee; }
}
