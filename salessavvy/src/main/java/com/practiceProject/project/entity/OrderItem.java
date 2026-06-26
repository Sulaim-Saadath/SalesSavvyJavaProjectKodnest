package com.practiceProject.project.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {

	// Primary Key
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;
	
	@Column(name = "product_id", nullable = false)
	private Integer productId;
	
	@Column(name = "quantity", nullable = false)
	private Integer quantity;
	
	@Column(name = "price_per_unit", nullable = false)
	private BigDecimal pricePerUnit;
	
	@Column(name = "total_price", nullable = false)
	private BigDecimal totalPrice;

	public OrderItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrderItem(Integer id, Order order, Integer productId, Integer quantity, BigDecimal pricePerUnit,
			BigDecimal totalPrice) {
		super();
		this.id = id;
		this.order = order;
		this.productId = productId;
		this.quantity = quantity;
		this.pricePerUnit = pricePerUnit;
		this.totalPrice = totalPrice;
	}

	// Getters and Setters
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getPricePerUnit() {
		return pricePerUnit;
	}

	public void setPricePerUnit(BigDecimal pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
}
