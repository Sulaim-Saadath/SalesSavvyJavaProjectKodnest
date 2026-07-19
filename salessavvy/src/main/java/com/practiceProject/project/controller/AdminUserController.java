package com.practiceProject.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practiceProject.project.entity.User;
import com.practiceProject.project.service.AdminUserService;

@RestController
@RequestMapping("/admin/user")
public class AdminUserController {

	private final AdminUserService adminUserService;

	public AdminUserController(AdminUserService adminUserService) {
		super();
		this.adminUserService = adminUserService;
	}

	@PutMapping("/modify")
	public ResponseEntity<?> modifyUser(@RequestBody Map<String, Object> userRequest) {
		try {
			Integer userId = (Integer) userRequest.get("userId");
			String username = (String) userRequest.get("username");
			String email = (String) userRequest.get("email");
			String role = (String) userRequest.get("role");
			User updatedUser = adminUserService.modifyUser(userId, username, email, role);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("userId", updatedUser.getUserId());
			response.put("username", updatedUser.getUsername());
			response.put("email", updatedUser.getEmail());
			response.put("role", updatedUser.getRole());
			response.put("createdAt", updatedUser.getCreatedAt());
			response.put("updatedAt", updatedUser.getUpdatedAt());
			return ResponseEntity.status(HttpStatus.OK).body("User Modified successfully");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong");
		}
	}

	public ResponseEntity<?> getUserById(@RequestBody Map<String, Integer> userRequest) {
		try {
			Integer userId = userRequest.get("userId");
			User user = adminUserService.getUserById(userId);
			return ResponseEntity.status(HttpStatus.OK).body(user);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong");
		}
	}
}
