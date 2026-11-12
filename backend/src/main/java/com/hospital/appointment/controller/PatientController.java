package com.hospital.appointment.controller;

import com.hospital.appointment.dto.PatientRequest;
import com.hospital.appointment.entity.Patient;
import com.hospital.appointment.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {
    private final PatientService service;
    public PatientController(PatientService service) { this.service = service; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Patient register(@Valid @RequestBody PatientRequest request) {
        return service.register(request);
    }

    @GetMapping
    public List<Patient> findAll() { return service.findAll(); }
}
