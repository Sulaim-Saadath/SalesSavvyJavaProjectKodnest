package com.practiceProject.project.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity // -> Convert this Java class into a database table.
@Table(name = "jwt_tokens") // -> Sets custom table name. jwt_tokens
public class JWTToken {
	@Id // PRIMARY KEY -> Every table needs one unique identifier.
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto generate values in database MySQL handles ID generation
	private Integer tokenId;

	// Many JWT tokens can belong to one User
	// Creates foreign key column 'user_id'
	// This connects jwt_tokens table with users table
	// User object reference
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	// @Column -> Used to configure database column properties.
	// nullable = false -> Token cannot be empty
	// length = 1000 -> Length of data
	// Stores generated JWT token
	@Column(nullable = false, length = 1000)
	private String token;

	// Stores when token will expire
	@Column(nullable = false)
	private LocalDateTime expiresAt;

	// Default Constructor
	public JWTToken() {
		super();
		// TODO Auto-generated constructor stub
	}

//	Parameterized Constructor with tokenID
	public JWTToken(Integer tokenId, User user, String token, LocalDateTime expiresAt) {
		super();
		this.tokenId = tokenId;
		this.user = user;
		this.token = token;
		this.expiresAt = expiresAt;
	}

	// Parameterized Constructor without tokenID
	public JWTToken(User user, String token, LocalDateTime expiresAt) {
		super();
		this.user = user;
		this.token = token;
		this.expiresAt = expiresAt;
	}

	// Getters and Setters
	public Integer getTokenId() {
		return tokenId;
	}

	public void setTokenId(Integer tokenId) {
		this.tokenId = tokenId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(LocalDateTime expiresAt) {
		this.expiresAt = expiresAt;
	}
}

