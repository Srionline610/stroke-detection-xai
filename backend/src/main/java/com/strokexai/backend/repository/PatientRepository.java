package com.strokexai.backend.repository;

import com.strokexai.backend.entity.Patient;
import com.strokexai.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByDoctor(User doctor);
    Optional<Patient> findByPatientId(String patientId);
    boolean existsByPatientId(String patientId);
}