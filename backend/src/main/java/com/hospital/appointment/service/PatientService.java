package com.hospital.appointment.service;

import com.hospital.appointment.dto.PatientRequest;
import com.hospital.appointment.entity.Patient;
import com.hospital.appointment.exception.ResourceNotFoundException;
import com.hospital.appointment.repository.PatientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatientService {
    private final PatientRepository repository;

    public PatientService(PatientRepository repository) {
        this.repository = repository;
    }

    public Patient register(PatientRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("A patient with this email already exists.");
        }
        Patient patient = new Patient(request.getName(), request.getEmail(), request.getPhone());
        return repository.save(patient);
    }

    public List<Patient> findAll() {
        return repository.findAll();
    }

    public Patient findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found: " + id));
    }
}
