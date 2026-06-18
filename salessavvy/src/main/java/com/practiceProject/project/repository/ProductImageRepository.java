package com.practiceProject.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.practiceProject.project.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer>{
	List<ProductImage> findByProduct_ProductId(Integer productId);
	// Custom derived query method using Spring Data JPA
	// Fetches all ProductImage records belonging to a specific product

	// Breakdown of method name:
	// findBy                → tells Spring to create a SELECT query
	// Product               → refers to Product object inside ProductImage entity
	// _ProductId            → accesses productId field of Product entity

	// Internally Spring generates query similar to:
	// SELECT * FROM productimages WHERE product_id = ?

	// Returns:
	// List<ProductImage> because one product can have multiple images

	// Example:
	// Product ID = 1
	// Returns all images linked to product 1
	@Query("DELETE FROM ProductImage pi WHERE pi.product.productId = :productId")
	void deleteByProductId(Integer productId);
}

