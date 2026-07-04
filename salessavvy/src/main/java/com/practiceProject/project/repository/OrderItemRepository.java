package com.practiceProject.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.practiceProject.project.entity.OrderItem;
import com.practiceProject.project.entity.OrderStatus;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	@Query("SELECT oi FROM OrderItem oi WHERE oi.order.orderId = :orderId")
	List<OrderItem> findByOrderId(String orderId);
	
	@Query("""
		    SELECT oi
		    FROM OrderItem oi
		    WHERE oi.order.userId = :userId
		      AND oi.order.status = :status
		""")
		List<OrderItem> findByUserIdAndStatus(int userId, OrderStatus status);
}
