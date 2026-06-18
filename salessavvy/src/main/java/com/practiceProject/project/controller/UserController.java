package com.practiceProject.project.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practiceProject.project.entity.User;
import com.practiceProject.project.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/users")
public class UserController {
	// Create UserService object reference
	// final means value cannot be changed later
	private final UserService userService;

	// Constructor Injection
	// Spring automatically gives UserService object here
	public UserController(UserService userService) {

		// Assign received object to local variable
		this.userService = userService;
	}

	// This method handles POST request
	// URL becomes: /api/users/register
	@PostMapping("/register")
	// @RequestBody converts JSON into User object
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		// localhost:8080/api/users/register
		// try block handles normal execution
		try {

			// Send user data to service layer for registration
			User registeredUser = userService.registerUser(user);

			// Return success response
			// ResponseEntity.ok() means HTTP status 200
			return ResponseEntity.ok(

					// Map.of creates JSON-style key-value response
					Map.of("message", "User registered successfully", "userId", registeredUser.getUserId()));

			// catch block handles errors/exceptions
		} catch (RuntimeException e) {

			// Return HTTP 400 Bad Request with error message
			return ResponseEntity.badRequest()

					// Send error message as JSON
					.body(Map.of("error", e.getMessage()));
		}
	}
}
