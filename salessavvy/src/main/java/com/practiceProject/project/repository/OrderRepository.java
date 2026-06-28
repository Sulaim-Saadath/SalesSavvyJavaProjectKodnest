package com.practiceProject.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practiceProject.project.entity.Order;

public interface OrderRepository extends JpaRepository<Order, String> {

}
