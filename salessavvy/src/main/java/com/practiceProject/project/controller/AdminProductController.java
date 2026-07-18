package com.practiceProject.project.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practiceProject.project.entity.Product;
import com.practiceProject.project.service.AdminProductService;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {

	private final AdminProductService adminProductService;

	public AdminProductController(AdminProductService adminProductService) {
		super();
		this.adminProductService = adminProductService;
	}

	public ResponseEntity<?> addProduct(@RequestBody Map<String, Object> productRequest) {
		try {
			// Read product details from the request body
			String name = (String) productRequest.get("name");
			String description = (String) productRequest.get("desctiption");
			Double price = Double.valueOf(String.valueOf(productRequest.get("price")));
			Integer stock = (Integer) productRequest.get("stock");
			Integer categoryId = (Integer) productRequest.get("categoryId");
			String imageUrl = (String) productRequest.get("imageUrl");

			// Call service layer to add the product and its image
			Product addedProduct = adminProductService.addProductWithImage(name, description, price, stock, categoryId,
					imageUrl);

			// Return success response after product is added
			return ResponseEntity.status(HttpStatus.CREATED).body(addedProduct);

		} catch (IllegalArgumentException e) {

			// Return 400 Bad Request if validation fails (e.g., invalid category)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

		} catch (Exception e) {

			// Return 500 Internal Server Error for unexpected exceptions
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
		}
	}

	@DeleteMapping()
	public ResponseEntity<?> deleteProduct(@RequestBody Map<String, Integer> requestBody) {
		try {
			Integer productId = requestBody.get("productId");
			adminProductService.deleteProduct(productId);
			return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting with the product: " + e.getMessage());
		}
	}
}
