package com.practiceProject.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.practiceProject.project.entity.CartItem;

import jakarta.transaction.Transactional;

public interface CartRepository extends JpaRepository<CartItem, Integer> {

	@Query("""
			SELECT c
			FROM CartItem c
			WHERE c.user.userId = :userId
			AND c.product.productId = :productId
			""")
	Optional<CartItem> findByUserAndProduct(@Param("userId") int userId, @Param("productId") int productId);

	@Query("""
			SELECT COALESCE(SUM(c.quantity), 0)
			FROM CartItem c
			WHERE c.user.userId = :userId
			""")
	Long countTotalItems(@Param("userId") int userId);
	
    // Fetch all cart items belonging to a user
    List<CartItem> findByUser_UserId(Integer userId);

	// Custom JPQL query
	// Fetch cart items belonging to a specific user
	// JOIN FETCH loads Product data together with CartItem
	// LEFT JOIN FETCH loads ProductImage data if available
	// This helps avoid multiple database queries (N+1 problem)

	@Query("""
			SELECT c
			FROM CartItem c
			JOIN FETCH c.product p
			LEFT JOIN FETCH ProductImage pi
			     ON p.productId = pi.product.productId
			WHERE c.user.userId = :userId
			""")
	List<CartItem> findCartItemsWithProductDetails(int userId);

	@Modifying
	@Transactional
	// Custom JPQL query
	// JPQL works with Entity names and field names
	// NOT table names and column names

	@Query("UPDATE CartItem c " + // Update CartItem entity
			"SET c.quantity = :quantity " + // Set new quantity value
			"WHERE c.id = :cartItemId" // Update only this cart item
	)

	// cartItemId -> identifies which cart row to update
	// quantity -> new quantity value to store
	void updateCartItemQuantity(int cartItemId, int quantity);
	

	// Custom query to delete a cart item
	@Modifying
	// Execute delete operation within a transaction
	@Transactional
	@Query("""
	       DELETE FROM CartItem c
	       WHERE c.user.userId = :userId
	       AND c.product.productId = :productId
	       """)
	void deleteCartItem(
	        @Param("userId") int userId,
	        @Param("productId") int productId);
}