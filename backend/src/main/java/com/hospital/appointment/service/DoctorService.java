package com.hospital.appointment.service;

import com.hospital.appointment.dto.DoctorRequest;
import com.hospital.appointment.entity.Doctor;
import com.hospital.appointment.exception.ResourceNotFoundException;
import com.hospital.appointment.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {
    private final DoctorRepository repository;

    public DoctorService(DoctorRepository repository) {
        this.repository = repository;
    }

    public List<Doctor> findAll() { return repository.findAll(); }

    public Doctor findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found: " + id));
    }

    public Doctor create(DoctorRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("A doctor with this email already exists.");
        }
        Doctor doctor = new Doctor(request.getName(), request.getSpecialization(),
                request.getEmail(), request.getConsultationFee());
        return repository.save(doctor);
    }

    public Doctor update(Long id, DoctorRequest request) {
        Doctor doctor = findById(id);
        doctor.setName(request.getName());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setEmail(request.getEmail());
        doctor.setConsultationFee(request.getConsultationFee());
        return repository.save(doctor);
    }

    public void delete(Long id) {
        Doctor doctor = findById(id);
        repository.delete(doctor);
    }
}
