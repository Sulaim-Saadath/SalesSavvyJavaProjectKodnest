package com.practiceProject.project.controller;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practiceProject.project.entity.User;
import com.practiceProject.project.repository.UserRepository;
import com.practiceProject.project.service.CartService;

import jakarta.servlet.http.HttpServletRequest;

//Handles HTTP requests related to cart operations
@RestController

//Allows requests from React frontend running on port 5174
//allowCredentials = true enables cookies (JWT token)
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

//Base URL for all cart APIs
@RequestMapping("/api/cart")
public class CartController {

	// Inject CartService object
	@Autowired
	private CartService cartService;

	// Inject UserRepository object
	@Autowired
	private UserRepository userRepository;

	// API Endpoint:
	// POST http://localhost:9090/api/cart/add
	@PostMapping("/add")
	public ResponseEntity<Void> addToCart(@RequestBody Map<String, Object> request) {

		// Extract username from request body
		String username = (String) request.get("username");

		// Extract productId from request body
		int productId = (int) request.get("productId");

		// Handle quantity
		// If quantity is provided, use it
		// Otherwise default quantity = 1
		int quantity = request.containsKey("quantity") ? (int) request.get("quantity") : 1;

		// Fetch user using username
		User user = userRepository.findByUsername(username)

				// Throw exception if user not found
				.orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

		// Call service layer to perform Add-To-Cart logic
		cartService.addToCart(user.getUserId(), // User ID
				productId, // Product ID
				quantity // Quantity
		);

		// Return HTTP Status 201 (Created)
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// API endpoint to fetch all cart items of the logged-in user
	@GetMapping("/items")
	public ResponseEntity<?> getCartItems(HttpServletRequest request) {

		// Retrieve the authenticated user from the request.
		// This user was attached by AuthenticationFilter after validating JWT.
		User authenticatedUser = (User) request.getAttribute("authenticatedUser");

		// If no authenticated user is found,
		// return 401 Unauthorized response.
		if (authenticatedUser == null) {

			return ResponseEntity.status(401).body(Map.of("error", "Unauthorized access"));
		}

		// Call the service layer to fetch cart details
		// for the authenticated user.
		Map<String, Object> cartItems = cartService.getCartItems(authenticatedUser.getUserId());

		// Return the cart data with HTTP 200 OK response.
		return ResponseEntity.ok(cartItems);
	}
	
	// API endpoint to fetch total cart item count
	@GetMapping("/items/count")
	public ResponseEntity<?> getCartItemCount(
	        HttpServletRequest request) {

	    // Get authenticated user from JWT filter
	    User authenticatedUser =
	            (User) request.getAttribute("authenticatedUser");

	    // If user is not authenticated
	    if (authenticatedUser == null) {

	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of(
	                        "error",
	                        "Unauthorized access"
	                ));
	    }

	    // Call service layer
	    int count = cartService.getCartItemCount(
	            authenticatedUser.getUserId());

	    // Return count
	    return ResponseEntity.ok(count);
	}
	
	// Handles HTTP PUT requests to:
	// http://localhost:9090/api/cart/update
	@PutMapping("/update")
	public ResponseEntity<?> updateCartItemQuantity(

	        // Receives JSON data from the request body
	        // Example:
	        // {
	        //   "productId": 1,
	        //   "quantity": 1
	        // }
	        @RequestBody Map<String, Object> requestBody,

	        // Gives access to the current HTTP request
	        // We use this to get the authenticated user
	        HttpServletRequest request) {

	    // ------------------------------------------------------------------
	    // STEP 1: Get the logged-in user from AuthenticationFilter
	    // ------------------------------------------------------------------
	    // Earlier, AuthenticationFilter validated the JWT token
	    // and attached the user object to the request.
	    //
	    // request.setAttribute("authenticatedUser", authenticatedUser);
	    //
	    // Here we retrieve that same user.
	    User authenticatedUser =
	            (User) request.getAttribute("authenticatedUser");

	    // If no user exists, token is invalid or missing
	    if (authenticatedUser == null) {

	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of(
	                        "error",
	                        "Unauthorized access"
	                ));
	    }

	    // ------------------------------------------------------------------
	    // STEP 2: Read productId from request body
	    // ------------------------------------------------------------------
	    // Example request:
	    // {
	    //   "productId": 1,
	    //   "quantity": 1
	    // }
	    //
	    // Extract productId value
	    Object productIdObj =
	            requestBody.get("productId");

	    // If productId is missing, return error
	    if (productIdObj == null) {

	        return ResponseEntity.badRequest()
	                .body(Map.of(
	                        "error",
	                        "productId is required"
	                ));
	    }

	    // ------------------------------------------------------------------
	    // STEP 3: Read quantity change value
	    // ------------------------------------------------------------------
	    // quantity = 1  -> Increase quantity
	    // quantity = -1 -> Decrease quantity
	    Object quantityObj =
	            requestBody.get("quantity");

	    // Quantity field must be present
	    if (quantityObj == null) {

	        return ResponseEntity.badRequest()
	                .body(Map.of(
	                        "error",
	                        "quantity is required"
	                ));
	    }

	    try {

	        // --------------------------------------------------------------
	        // STEP 4: Convert incoming values into integers
	        // --------------------------------------------------------------
	        // JSON values arrive as generic Objects.
	        // Convert them into int values.
	        int productId =
	                Integer.parseInt(productIdObj.toString());

	        int quantity =
	                Integer.parseInt(quantityObj.toString());

	        // --------------------------------------------------------------
	        // STEP 5: Validate quantity operation
	        // --------------------------------------------------------------
	        // Frontend buttons:
	        // "+" button sends quantity = 1
	        // "-" button sends quantity = -1
	        //
	        // Any other value should be rejected.
	        if (quantity != 1 && quantity != -1) {

	            return ResponseEntity.badRequest()
	                    .body(Map.of(
	                            "error",
	                            "quantity must be 1 or -1"
	                    ));
	        }

	        // --------------------------------------------------------------
	        // STEP 6: Call service layer
	        // --------------------------------------------------------------
	        // Controller should not contain business logic.
	        // Service layer handles:
	        //
	        // 1. Finding the cart item
	        // 2. Increasing quantity
	        // 3. Decreasing quantity
	        // 4. Removing item if quantity becomes 0
	        //
	        cartService.updateCartItemQuantity(
	                authenticatedUser.getUserId(),
	                productId,
	                quantity
	        );

	        // --------------------------------------------------------------
	        // STEP 7: Return success response
	        // --------------------------------------------------------------
	        return ResponseEntity.ok(
	                Map.of(
	                        "message",
	                        "Cart item quantity updated successfully"
	                )
	        );

	    } catch (NumberFormatException e) {

	        // Happens if user sends invalid numbers
	        // Example:
	        // {
	        //   "productId": "abc",
	        //   "quantity": "xyz"
	        // }
	        return ResponseEntity.badRequest()
	                .body(Map.of(
	                        "error",
	                        "productId and quantity must be valid numbers"
	                ));

	    } catch (RuntimeException e) {

	        // Any business logic exception from service layer
	        // Example:
	        // Product not found
	        // Cart item not found
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(Map.of(
	                        "error",
	                        e.getMessage()
	                ));
	    }
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteCartItem(
	        @RequestBody Map<String, Object> request) {

	    // Extract username from request body
	    String username = (String) request.get("username");

	    // Extract product ID from request body
	    int productId = (int) request.get("productId");

	    // Find user using username
	    User user = userRepository.findByUsername(username)

	            // Throw exception if user does not exist
	            .orElseThrow(() -> new IllegalArgumentException(
	                    "User not found with username: " + username));

	    // Call service layer to delete the cart item
	    cartService.deleteCartItem(
	            user.getUserId(),
	            productId);

	    // Return HTTP 204 No Content after successful deletion
	    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
