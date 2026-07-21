package com.practiceProject.project.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.practiceProject.project.entity.Order;
import com.practiceProject.project.entity.OrderItem;
import com.practiceProject.project.repository.OrderItemRepository;
import com.practiceProject.project.repository.OrderRepository;
import com.practiceProject.project.repository.ProductRepository;

@Service
public class AdminBusinessService {
	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final ProductRepository productRespository;

	public AdminBusinessService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
			ProductRepository productRespository) {
		super();
		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
		this.productRespository = productRespository;
	}
	
	public Map<String, Object> calculateMonthlyBusiness(int month, int year) {
		List<Order> succesfullOrders = orderRepository.findSuccessfulOrderByMonthAndYear(month, year);
		return calculateBusinessMetrics(succesfullOrders);
	}
	
	public Map<String, Object> calculateDailyBusiness(LocalDate date) {
		List<Order> succesfullOrders = orderRepository.findSuccessfulOrdersByDate(date);
		return calculateBusinessMetrics(succesfullOrders);
	}
	
	public Map<String, Object> calculateYearlyBusiness(int year) {
		List<Order> succesfullOrders = orderRepository.findSuccessfulOrdersByYear(year);
		return calculateBusinessMetrics(succesfullOrders);
	}
	
	public Map<String, Object> calculateOverallBusiness() {
		List<Order> succesfullOrders = orderRepository.findAllByStatus("SUCCESS");
		BigDecimal totalBusiness = orderRepository.calculateOverallBusiness();
		Map<String, Object> response = calculateBusinessMetrics(succesfullOrders);
		response.put("totalBusiness", totalBusiness.doubleValue());
		return response;
	}
	
	private Map<String, Object> calculateBusinessMetrics(List<Order> orders) {
		double totalRevenue = 0.0;
		Map<String, Integer> categorySales = new HashMap<String, Integer>();
		for(Order order: orders) {
			totalRevenue += order.getTotalAmount().doubleValue();
			
			List<OrderItem> items = orderItemRepository.findByOrderId(order.getOrderId());
			for(OrderItem item:items) {
				String categoryName = productRespository.findCategoryNameByProductId(item.getProductId());
				categorySales.put(categoryName, categorySales.getOrDefault(categoryName, 0) + item.getQuantity());
			}
		}
		
		Map<String, Object> metrics = new HashMap<String, Object>();
		metrics.put("totalRevenue", totalRevenue);
		metrics.put("categorySales", categorySales);
		return metrics;
	}

}
