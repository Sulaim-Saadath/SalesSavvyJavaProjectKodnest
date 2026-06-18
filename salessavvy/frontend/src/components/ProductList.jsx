import React from "react";
import "../App.css";
export function ProductList({products, onAddToCart}) {
    if(products.length === 0) {
        return <p>No products available.</p>
    }
    return (
  <div className="product-grid">
    {products.map((product) => (
      <div
        key={product.product_id}
        className="product-card"
      >
        <img
          className="product-image"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x250?text=No+Image";
          }}
        />

        <div className="product-details">
          <h3>{product.name}</h3>

          <p className="product-price">
            ₹{product.price}
          </p>

          <p className="product-stock">
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </p>

          <button
            onClick={() =>
              onAddToCart(product.product_id)
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
);
}