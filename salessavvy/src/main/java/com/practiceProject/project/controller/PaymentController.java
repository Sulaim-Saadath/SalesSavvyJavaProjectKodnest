package com.practiceProject.project.controller;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.practiceProject.project.entity.OrderItem;
import com.practiceProject.project.entity.User;
import com.practiceProject.project.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private UserRepository userRepository;

	/*
	 * Create Razorpay Order
	 * 
	 * @param requestBody Contains totalAmount and cartItems
	 * 
	 * @param request Authenticated HTTP request
	 * 
	 * @return Razorpay Order ID
	 */
	@PostMapping("/create")
	public ResponseEntity<String> createPaymentOrder(@RequestBody Map<String, Object> requestBody,
			HttpServletRequest request) {
		try {
			// Fetch Authenticated User
			User user = (User) request.getAttribute("authenticatedUser");
			if (user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
			}

			// Extract total amount from request body
			BigDecimal totalAmount = new BigDecimal(requestBody.get("totalAmount").toString());

			// Extract cart items
			List<Map<String, Object>> cartItemsRaw = (List<Map<String, Object>>) requestBody.get("cartItems");

			// Convert cartItemsRaw to List<OrderItem>
			List<OrderItem> cartItems = cartItemsRaw.stream().map(item -> {
				OrderItem orderItem = new OrderItem();
				orderItem.setProductId((Integer) item.get("productId"));
				orderItem.setQuantity((Integer) item.get("quantity"));
				BigDecimal pricePerUnit = new BigDecimal(item.get("price").toString());
				orderItem.setPricePerUnit(pricePerUnit);
				orderItem.setTotalPrice(pricePerUnit.multiply(BigDecimal.valueOf((Integer) item.get("quantity"))));
				return orderItem;
			}).collect(Collectors.toList());

			// Call the payment service to create Razor pay order
			String razorpayOrderId = paymentService.createOrder(user.getUserId(), totalAmount, cartItems);
			return ResponseEntity.ok(razorpayOrderId);
		} catch (RazorpayExcption e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error creating razor pay order: " + e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request data: " + e.getMessage());
		}
	}

	/**
	 * Verify Razorpay Payment
	 *
	 * @param requestBody Map containing Razorpay payment details
	 * @param request     HttpServletRequest for authenticated user
	 * @return ResponseEntity with success or failure message
	 */

	@PostMapping("/verify")
	public ResponseEntity<String> verifyPayment(@RequestBody Map<String, Object> requestBody,
			HttpServletRequest request) {
		try {
			// Fetch the authenticated user from the request
			User user = (User) request.getAttribute("authenticatedUser");

			// If no user is logged in, return 401 Unauthorized
			if (user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
			}

			// Get the authenticated user's ID
			int userId = user.getUserId();

			// Extract Razorpay payment details from the request body
			String razorpayOrderId = (String) requestBody.get("razorpayOrderId");
			String razorpayPaymentId = (String) requestBody.get("razorpayPaymentId");
			String razorPaySignature = (String) requestBody.get("razorpaySignature");

			// Call the service layer to verify the payment
			boolean isVerified = paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorPaySignature,
					userId);

			// Return response based on verification result
			if (isVerified) {
				return ResponseEntity.ok("Payment verified succesfully");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment Verification failed");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error verifying payment: " + e.getMessage());
		}
	}
}
