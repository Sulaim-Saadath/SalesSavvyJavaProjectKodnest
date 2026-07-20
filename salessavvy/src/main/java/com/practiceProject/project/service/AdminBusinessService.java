package com.practiceProject.project.service;

import org.springframework.stereotype.Service;

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
	
	

}
