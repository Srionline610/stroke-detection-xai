package com.strokexai.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}