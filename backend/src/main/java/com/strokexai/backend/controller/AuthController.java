package com.strokexai.backend.controller;

import com.strokexai.backend.dto.LoginRequest;
import com.strokexai.backend.dto.LoginResponse;
import com.strokexai.backend.dto.RegisterRequest;
import com.strokexai.backend.entity.User;
import com.strokexai.backend.repository.UserRepository;
import com.strokexai.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );

            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
            );

            return ResponseEntity.ok(new LoginResponse(
                token,
                user.getRole().name(),
                user.getName(),
                user.getEmail(),
                user.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Invalid email or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                    .body("Email already exists");
            }

            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhone(request.getPhone());
            user.setSpecialization(request.getSpecialization());
            user.setRole(User.Role.valueOf(
                request.getRole() != null
                ? request.getRole().toUpperCase()
                : "DOCTOR"
            ));
            user.setActive(true);

            userRepository.save(user);

            return ResponseEntity.ok("User registered successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("StrokeXAI Backend is running! ✅");
    }
}