package com.strokexai.backend.repository;

import com.strokexai.backend.entity.Scan;
import com.strokexai.backend.entity.Patient;
import com.strokexai.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScanRepository extends JpaRepository<Scan, Long> {
    List<Scan> findByPatient(Patient patient);
    List<Scan> findByDoctor(User doctor);
    List<Scan> findByDoctorOrderByCreatedAtDesc(User doctor);
    long countByDoctor(User doctor);
    long countByResult(String result);
}