package com.practiceProject.project.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.practiceProject.project.entity.Role;
import com.practiceProject.project.entity.User;
import com.practiceProject.project.repository.UserRepository;

//Marks this class as REST API controller
@Service
public class UserService {
    // Repository object
    private final UserRepository userRepository;

    // Password encoder object
    private final BCryptPasswordEncoder passwordEncoder;

    // Constructor injection
    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Method for user registration
    public User registerUser(User user) {

        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {

            // Throw error if username exists
            throw new RuntimeException("Username is already taken");
        }

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            // Throw error if email exists
            throw new RuntimeException("Email is already registered");
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.CUSTOMER);
        // Save user in database
        return userRepository.save(user);
    }
}
