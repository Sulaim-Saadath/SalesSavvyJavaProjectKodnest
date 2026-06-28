package com.practiceProject.project.entity;

//Serializable allows object conversion into byte stream
import java.io.Serializable;

//JPA annotations
import jakarta.persistence.*;

@Entity // Converts this Java class into a database table
@Table(name = "cart_items") // Sets table name as cart_items
public class CartItem implements Serializable {

	@Id // Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
	private Integer id;

	// Many cart items can belong to one user
	// Creates foreign key column user_id
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	// Many cart items can reference one product
	// Creates foreign key column product_id
	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	// Stores quantity of the product in the cart
	private int quantity;

	// Default Constructor
	public CartItem() {
	}

	// Constructor without ID
	// Used when creating a new cart item
	public CartItem(User user, Product product, int quantity) {
		this.user = user;
		this.product = product;
		this.quantity = quantity;
	}

	// Constructor with ID
	// Used when all values including ID are available
	public CartItem(Integer id, User user, Product product, int quantity) {
		this.id = id;
		this.user = user;
		this.product = product;
		this.quantity = quantity;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}