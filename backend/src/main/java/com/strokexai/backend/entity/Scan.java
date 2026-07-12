package com.strokexai.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "scans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Scan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;

    @Column(name = "scan_type")
    private String scanType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_name")
    private String fileName;

    private String result;
    private Double confidence;

    @Column(name = "heatmap_path")
    private String heatmapPath;

    @Column(name = "cnn_confidence")
    private Double cnnConfidence;

    @Column(name = "resnet_confidence")
    private Double resnetConfidence;

    @Column(name = "efficientnet_confidence")
    private Double efficientnetConfidence;

    @Column(name = "ensemble_confidence")
    private Double ensembleConfidence;

    private String notes;
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}