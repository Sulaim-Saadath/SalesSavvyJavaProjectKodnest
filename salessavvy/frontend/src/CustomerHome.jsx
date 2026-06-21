import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "./components/CategoryNavigation";
import { ProductList } from "./components/ProductList";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./CustomerHome.css";

export default function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();

    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchProducts = async (category = "") => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/products${
          category ? `?category=${category}` : ""
        }`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch products");
      }

      const data = await response.json();

      setUsername(data.user?.name || "Guest");
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);

    try {
      const response = await fetch(
        `http://localhost:9090/api/cart/items/count?username=${username}`,
        {
          credentials: "include",
        },
      );

      const count = await response.json();

      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error("Username is required to add items to the cart");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/cart/add", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          username,
          productId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchCartCount();
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? "..." : cartError ? "Error" : cartCount}
        username={username}
      />

      <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-bar"
/>

      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>

      <main className="main-content">
        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      </main>

      <Footer />
    </div>
  );
}
