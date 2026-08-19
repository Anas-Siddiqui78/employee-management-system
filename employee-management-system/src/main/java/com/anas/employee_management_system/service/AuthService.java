package com.anas.employee_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anas.employee_management_system.dto.AuthResponse;
import com.anas.employee_management_system.dto.LoginRequest;
import com.anas.employee_management_system.dto.RegisterRequest;
import com.anas.employee_management_system.entity.User;
import com.anas.employee_management_system.repository.UserRepository;
import com.anas.employee_management_system.util.JwtUtil;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getName(), user.getRole());
        
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getName(), user.getRole());
        
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }
}  