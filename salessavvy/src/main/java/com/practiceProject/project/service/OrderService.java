package com.practiceProject.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practiceProject.project.entity.OrderItem;
import com.practiceProject.project.entity.OrderStatus;
import com.practiceProject.project.entity.Product;
import com.practiceProject.project.entity.ProductImage;
import com.practiceProject.project.entity.User;
import com.practiceProject.project.repository.OrderItemRepository;
import com.practiceProject.project.repository.ProductImageRepository;
import com.practiceProject.project.repository.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductImageRepository productImageRepository;

	/*
	 * Fetches all successful orders for a given user and returns the required
	 * response format.
	 * 
	 * @param user The authenticated user object.
	 * 
	 * @return A map containing the user's role, username, and ordered products.
	 */
	public Map<String, Object> getOrdersForUser(User user) {

		// Fetch all successful order items for the user
		List<OrderItem> orderItems = orderItemRepository.findByUserIdAndStatus(user.getUserId(), OrderStatus.SUCCESS);

		// Prepare the response map
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("username", user.getUsername());
		response.put("role", user.getRole()); // Directly use the role as it is an enum mapped to a string
		
		// Transform order items into a list of product details
		List<Map<String, Object>> products = new ArrayList<Map<String, Object>>();
		for(OrderItem orderItem:orderItems) {
			Product product = productRepository.findById(orderItem.getProductId()).orElse(null);
			if(product == null) {
				continue; // Skip the product if it doesn't exist
			}
			
			// Fetch the product image (if available)
			List<ProductImage> image = productImageRepository.findByProduct_ProductId(product.getProductId());
			String imageUrl = image.isEmpty() ? null : image.get(0).getImageUrl();
			
			// Create a product details map
			Map<String, Object> productDetails = new HashMap<String, Object>();
			productDetails.put("order_id", orderItem.getOrder().getOrderId());
			productDetails.put("quantity", orderItem.getQuantity());
			productDetails.put("image_url", imageUrl);
			productDetails.put("product_id", orderItem.getProductId());
			productDetails.put("name", product.getName());
			productDetails.put("description", product.getDescription());
			productDetails.put("price_per_unit", orderItem.getPricePerUnit());
			
			products.add(productDetails);
		}
		
		// Add the product list to the response
		response.put("products", products);
		return response;
	}
}
