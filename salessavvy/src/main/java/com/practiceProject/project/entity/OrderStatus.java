package com.practiceProject.project.entity;

// Enum representing the states of the order
public enum OrderStatus {
	// Order has been created but payment is not completed
	PENDING,
	// Payment was successful and order is confirmed
	SUCCESS,
	  // Payment failed or verification was unsuccessful
	FAILED,
}
