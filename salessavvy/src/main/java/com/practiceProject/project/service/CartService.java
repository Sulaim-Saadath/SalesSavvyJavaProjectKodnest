package com.practiceProject.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practiceProject.project.entity.CartItem;
import com.practiceProject.project.entity.Product;
import com.practiceProject.project.entity.ProductImage;
import com.practiceProject.project.entity.User;
import com.practiceProject.project.repository.CartRepository;
import com.practiceProject.project.repository.ProductImageRepository;
import com.practiceProject.project.repository.ProductRepository;
import com.practiceProject.project.repository.UserRepository;

@Service
public class CartService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ProductImageRepository productImageRepository;

	@Transactional
	public void addToCart(int userId, int productId, int quantity) {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

		Optional<CartItem> existingItem = cartRepository.findByUserAndProduct(userId, productId);

		if (existingItem.isPresent()) {
			CartItem cartItem = existingItem.get();

			int newQuantity = cartItem.getQuantity() + quantity;

			if (newQuantity > product.getStock()) {
				throw new IllegalArgumentException("Requested quantity exceeds available stock");
			}

			cartItem.setQuantity(newQuantity);
			cartRepository.save(cartItem);
		} else {
			if (quantity > product.getStock()) {
				throw new IllegalArgumentException("Requested quantity exceeds available stock");
			}

			CartItem newItem = new CartItem(user, product, quantity);
			cartRepository.save(newItem);
		}
	}

	// This method fetches all cart items for a specific user
	public Map<String, Object> getCartItems(Integer userId) {

		// Fetch cart items for the given user using repository
		// This should return all items added by that user
		List<CartItem> cartItems = cartRepository.findCartItemsWithProductDetails(userId);

		// Create a response map to store final cart data
		Map<String, Object> response = new HashMap<String, Object>();

		// Fetch the user from database
		// If user is not found, throw an error
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

		// Add user information to the response
		response.put("username", user.getUsername());
		response.put("role", user.getRole().toString());

		// List to store each product inside the cart
		List<Map<String, Object>> products = new ArrayList<Map<String, Object>>();

		// Variable to store the overall total price of the cart
		double overallTotalPrice = 0;

		// Loop through every cart item
		for (CartItem cartItem : cartItems) {

			// Create a map to store one product's details
			Map<String, Object> productDetails = new HashMap<>();

			// Get the product from cart item
			Product product = cartItem.getProduct();

			// Fetch images for this product
			List<ProductImage> productImages = productImageRepository.findByProduct_ProductId(product.getProductId());

			// Use first image if available, otherwise default image
			String imageUrl = (productImages != null && !productImages.isEmpty()) ? productImages.get(0).getImageUrl()
					: "default-image-url";

			// Add product information to the map
			productDetails.put("product_id", product.getProductId());
			productDetails.put("image_url", imageUrl);
			productDetails.put("name", product.getName());
			productDetails.put("description", product.getDescription());
			productDetails.put("price_per_unit", product.getPrice());
			productDetails.put("quantity", cartItem.getQuantity());

			// Calculate total price for this product
			productDetails.put("total_price", cartItem.getQuantity() * product.getPrice().doubleValue());

			// Add this product to the products list
			products.add(productDetails);

			// Update overall cart total
			overallTotalPrice += cartItem.getQuantity() * product.getPrice().doubleValue();
		}

		// Prepare final cart response
		Map<String, Object> cart = new HashMap<>();
		cart.put("products", products);
		cart.put("overall_total_price", overallTotalPrice);

		// Add cart data into main response
		response.put("cart", cart);

		return response;
	}

	public void updateCartItemQuantity(int userId, int productId, int quantityChange) {

		// ------------------------------------------------------------
		// STEP 1: Check whether the user exists
		// ------------------------------------------------------------
		// We use userId from the authenticated user
		// If the user does not exist, we stop the process immediately
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

		// ------------------------------------------------------------
		// STEP 2: Check whether the product exists
		// ------------------------------------------------------------
		// We need to make sure the product is valid before updating cart
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new IllegalArgumentException("Product not found"));

		// ------------------------------------------------------------
		// STEP 3: Find the cart item for this user and product
		// ------------------------------------------------------------
		// This checks whether the user already has this product in cart
		Optional<CartItem> existingItem = cartRepository.findByUserAndProduct(userId, productId);

		// If the cart item is not present, we cannot update it
		if (existingItem.isEmpty()) {
			throw new IllegalArgumentException("Cart item not found");
		}

		// ------------------------------------------------------------
		// STEP 4: Get the existing cart item object
		// ------------------------------------------------------------
		CartItem cartItem = existingItem.get();

		// Current quantity already stored in cart
		int currentQuantity = cartItem.getQuantity();

		// ------------------------------------------------------------
		// STEP 5: Calculate the new quantity
		// ------------------------------------------------------------
		// quantityChange will be:
		// +1 for increase
		// -1 for decrease
		//
		// Example:
		// currentQuantity = 3
		// quantityChange = 1
		// newQuantity = 4
		int newQuantity = currentQuantity + quantityChange;

		// ------------------------------------------------------------
		// STEP 6: Prevent invalid quantity values
		// ------------------------------------------------------------
		// Quantity should never go below 0
		if (newQuantity < 0) {
			throw new IllegalArgumentException("Quantity cannot be less than zero");
		}

		// ------------------------------------------------------------
		// STEP 7: If quantity becomes 0, remove item from cart
		// ------------------------------------------------------------
		// Example:
		// currentQuantity = 1
		// quantityChange = -1
		// newQuantity = 0
		// In this case, delete the cart item completely
		System.out.println("Current Quantity = " + currentQuantity);
		System.out.println("Quantity Change = " + quantityChange);
		System.out.println("New Quantity = " + newQuantity);
		if (newQuantity == 0) {
			cartRepository.delete(cartItem);
		} else {
			// --------------------------------------------------------
			// STEP 8: Otherwise update the quantity in database
			// --------------------------------------------------------
			// We already calculated the final quantity.
			//
			// Example:
			// currentQuantity = 3
			// quantityChange = 1
			// newQuantity = 4
			//
			// Instead of loading and saving the entire entity,
			// we directly execute an UPDATE query for better performance.
			cartRepository.updateCartItemQuantity(cartItem.getId(), newQuantity);
		}
	}
	
	public void deleteCartItem(int userId, int productId) {

	    // Verify user exists
	    User user = userRepository.findById(userId)
	            .orElseThrow(() ->
	                    new IllegalArgumentException("User not found"));

	    // Verify product exists
	    Product product = productRepository.findById(productId)
	            .orElseThrow(() ->
	                    new IllegalArgumentException("Product not found"));

	    // Delete cart item
	    cartRepository.deleteCartItem(userId, productId);
	}
	
	public int getCartItemCount(Integer userId) {

	    return cartRepository
	            .findByUser_UserId(userId)
	            .stream()
	            .mapToInt(cartItem ->
	                    cartItem.getQuantity())
	            .sum();
	}
}