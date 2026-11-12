package com.hospital.appointment.controller;

import com.hospital.appointment.dto.DoctorRequest;
import com.hospital.appointment.entity.Doctor;
import com.hospital.appointment.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {
    private final DoctorService service;
    public DoctorController(DoctorService service) { this.service = service; }

    @GetMapping
    public List<Doctor> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Doctor findById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Doctor create(@Valid @RequestBody DoctorRequest request) { return service.create(request); }

    @PutMapping("/{id}")
    public Doctor update(@PathVariable Long id, @Valid @RequestBody DoctorRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
