package com.practiceProject.project.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public ResponseEntity<String> createPaymentOrder(
			@RequestBody Map<String, Object> requestBody,
			HttpServletRequest request) {
		try {
			// Fetch Authenticated User
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
						.body("User not authenticated");
			}
			
			// Extract total amount from request body
			BigDecimal totalAmount = new BigDecimal(requestBody.get("totalAmount").toString());
			
			// Extract cart items
			List<Map<String, Object>> cartItemsRaw = 
					(List<Map<String, Object>>) requestBody.get("cartItems");
			
			// Convert cartItemsRaw to List<OrderItem>
			List<OrderItem> cartItems = cartItemsRaw.stream()
					.map(item -> {
						OrderItem orderItem = new OrderItem();
						orderItem.setProductId((Integer) item.get("productId"));
						orderItem.setQuantity((Integer) item.get("quantity"));
						BigDecimal pricePerUnit = new BigDecimal(item.get("price").toString());
						orderItem.setPricePerUnit(pricePerUnit);
						orderItem.setTotalPrice(pricePerUnit.multiply(BigDecimal.valueOf((Integer)item.get("quantity"))));
						return orderItem;
					}).collect(Collectors.toList());
			
			// Call the payment service to create Razor pay order
			String razorpayOrderId = 
					paymentService.createOrder(
							user.getUserId(),
							totalAmount,
							cartItems);
		}
	}
}
