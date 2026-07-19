package com.practiceProject.project.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.practiceProject.project.entity.Role;
import com.practiceProject.project.entity.User;
import com.practiceProject.project.repository.JWTTokenRepository;
import com.practiceProject.project.repository.UserRepository;

@Service
public class AdminUserService {
	private final UserRepository userRepository;
	private final JWTTokenRepository jwtTokenRepository;

	public AdminUserService(UserRepository userRepository, JWTTokenRepository jwtTokenRepository) {
		super();
		this.userRepository = userRepository;
		this.jwtTokenRepository = jwtTokenRepository;
	}

	public User modifyUser(Integer userId, String username, String email, String role) {
		// Check If user exists
		User user = userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("User not found"));
		User existingUser = user;

		// Update user fields
		if (username != null && !username.isEmpty()) {
			existingUser.setUsername(username);
		}
		if (email != null && !email.isEmpty()) {
			existingUser.setEmail(email);
		}
		if (role != null && !role.isEmpty()) {
			try {
				existingUser.setRole(Role.valueOf(role));
			} catch (IllegalArgumentException e) {
				throw new IllegalArgumentException("Invalid role: " + role);
			}
		}

		// Delete associated JWT Tokens
		jwtTokenRepository.deleteByUserId(userId);

		// Save Updated User
		return userRepository.save(existingUser);
	}

	public User getUserById(Integer userId) {
		return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
	}
}
