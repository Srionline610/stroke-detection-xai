package com.strokexai.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.strokexai.backend.entity.Patient;
import com.strokexai.backend.entity.Scan;
import com.strokexai.backend.entity.User;
import com.strokexai.backend.repository.PatientRepository;
import com.strokexai.backend.repository.ScanRepository;
import com.strokexai.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/scans")
@CrossOrigin(origins = "http://localhost:3000")
public class ScanController {

    @Autowired
    private ScanRepository scanRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    // Upload scan file
    @PostMapping("/upload")
    public ResponseEntity<?> uploadScan(
            @RequestParam("file") MultipartFile file,
            @RequestParam("patientId") Long patientId,
            @RequestParam("doctorId") Long doctorId,
            @RequestParam("scanType") String scanType,
            @RequestParam(value = "notes", required = false) String notes) {

        try {
            // Find patient and doctor
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            User doctor = userRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // Create upload directory
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }

            // Save file with unique name
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());

            // Create scan record
            Scan scan = new Scan();
            scan.setPatient(patient);
            scan.setDoctor(doctor);
            scan.setScanType(scanType);
            scan.setFileName(fileName);
            scan.setFilePath(filePath.toString());
            scan.setNotes(notes);
            scan.setStatus("PENDING");

            Scan savedScan = scanRepository.save(scan);

            return ResponseEntity.ok(savedScan);

        } catch (IOException e) {
            return ResponseEntity.badRequest()
                    .body("File upload failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Error: " + e.getMessage());
        }
    }

    // Get all scans for a doctor
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<?> getScansByDoctor(@PathVariable Long doctorId) {
        try {
            User doctor = userRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            List<Scan> scans = scanRepository.findByDoctorOrderByCreatedAtDesc(doctor);
            return ResponseEntity.ok(scans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Get all scans for a patient
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getScansByPatient(@PathVariable Long patientId) {
        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));
            List<Scan> scans = scanRepository.findByPatient(patient);
            return ResponseEntity.ok(scans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Get scan by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getScanById(@PathVariable Long id) {
        try {
            Scan scan = scanRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Scan not found"));
            return ResponseEntity.ok(scan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Update scan result after AI analysis
    @PutMapping("/{id}/result")
    public ResponseEntity<?> updateScanResult(
            @PathVariable Long id,
            @RequestParam String result,
            @RequestParam Double confidence,
            @RequestParam(required = false) Double cnnConfidence,
            @RequestParam(required = false) Double resnetConfidence,
            @RequestParam(required = false) Double efficientnetConfidence,
            @RequestParam(required = false) Double ensembleConfidence,
            @RequestParam(required = false) String heatmapPath) {

        try {
            Scan scan = scanRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Scan not found"));

            scan.setResult(result);
            scan.setConfidence(confidence);
            scan.setCnnConfidence(cnnConfidence);
            scan.setResnetConfidence(resnetConfidence);
            scan.setEfficientnetConfidence(efficientnetConfidence);
            scan.setEnsembleConfidence(ensembleConfidence);
            scan.setHeatmapPath(heatmapPath);
            scan.setStatus("COMPLETED");

            Scan updatedScan = scanRepository.save(scan);
            return ResponseEntity.ok(updatedScan);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Get dashboard stats for doctor
    @GetMapping("/stats/{doctorId}")
    public ResponseEntity<?> getDoctorStats(@PathVariable Long doctorId) {
        try {
            User doctor = userRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            long totalScans = scanRepository.countByDoctor(doctor);
            long strokeDetected = scanRepository.countByResult("Stroke Detected");
            long noStroke = scanRepository.countByResult("No Stroke");

            return ResponseEntity.ok(new java.util.HashMap<String, Object>() {{
                put("totalScans", totalScans);
                put("strokeDetected", strokeDetected);
                put("noStroke", noStroke);
            }});
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}