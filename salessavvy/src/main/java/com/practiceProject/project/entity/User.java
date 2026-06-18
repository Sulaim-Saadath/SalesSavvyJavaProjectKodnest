package com.practiceProject.project.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity

// Table name in MySQL
@Table(name = "users")
public class User {

	// Primary key
	@Id

	// Auto increment ID
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;

	// Column cannot be null and must be unique
	@Column(nullable = false, unique = true)
	private String username;

	// Email cannot be null and must be unique
	@Column(nullable = false, unique = true)
	private String email;

	// Password cannot be null
	@Column(nullable = false)
	private String password;

	// Stores enum as String (ADMIN/CUSTOMER)
	@Enumerated(EnumType.STRING)

	// Role cannot be null
	@Column(nullable = false)
	private Role role;

	// Creation time
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	// Update time
	@Column(nullable = false)
	private LocalDateTime updatedAt = LocalDateTime.now();
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public User(Integer userId, String username, String email, String password, Role role, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public User(String username, String email, String password, Role role, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

}
