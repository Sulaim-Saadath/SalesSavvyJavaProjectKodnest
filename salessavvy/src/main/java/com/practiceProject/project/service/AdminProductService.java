package com.practiceProject.project.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.practiceProject.project.entity.Category;
import com.practiceProject.project.entity.Product;
import com.practiceProject.project.entity.ProductImage;
import com.practiceProject.project.repository.CategoryRepository;
import com.practiceProject.project.repository.ProductImageRepository;
import com.practiceProject.project.repository.ProductRepository;

@Service
public class AdminProductService {

	private final ProductRepository productRepository;
	private final ProductImageRepository productImageRepository;
	private final CategoryRepository categoryRepository;

	public AdminProductService(ProductRepository productRepository, ProductImageRepository productImageRepository,
			CategoryRepository categoryRepository) {
		super();
		this.productRepository = productRepository;
		this.productImageRepository = productImageRepository;
		this.categoryRepository = categoryRepository;
	}

	public Product addProductWithImage(String name, String description, Double price, Integer stock, Integer categoryId,
			String imageUrl) {
		Optional<Category> category = categoryRepository.findById(categoryId);
		if (category == null) {
			throw new IllegalArgumentException("Invalid Category ID");
		}

		Product product = new Product();

		product.setName(name);
		product.setDescription(description);
		product.setPrice(BigDecimal.valueOf(price));
		product.setStock(stock);
		product.setCategory(category.get());
		product.setCreatedAt(LocalDateTime.now());
		product.setUpdatedAt(LocalDateTime.now());

		Product saveProduct = productRepository.save(product);

		if (imageUrl != null && !imageUrl.isEmpty()) {
			ProductImage productImage = new ProductImage();
			productImage.setProduct(saveProduct);
			productImage.setImageUrl(imageUrl);
			productImageRepository.save(productImage);
		} else {
			throw new IllegalArgumentException("Product image URL cannot be empty");
		}

		return saveProduct;
	}
	
	public void deleteProduct(Integer productId) {
		
		// Check if the product exists
		if(!productRepository.existsById(productId)) {
			throw new IllegalArgumentException("Product not found");
		}
		
		// Delete all images associated with the product
		productImageRepository.deleteByProductId(productId);
		
		// Delete the product
		productRepository.deleteById(productId);
	}

}
