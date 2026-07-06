import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "./components/CategoryNavigation";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./OrdersPage.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [username, setUsername] = useState("");

  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/orders", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.products || []);
      setUsername(data.username || "Guest");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    // Starts the loading state before the API call.
    setIsCartLoading(true);
    try {
      // Sends a GET request to fetch the cart count using the current username and includes the JWT cookie.
      const response = await fetch(
        `http://localhost:9090/api/cart/items/count?username=${username}`,
        {
          credentials: "include",
        },
      );
      // Converts the API response into a JavaScript value (count).
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
  return (
    <div className="orders-page">
      <Header
        cartCount={isCartLoading ? "..." : cartError ? "Error" : cartCount}
        username={username}
      />

      <main className="orders-container">
        <h1 className="page-title">Your Orders</h1>

        {loading && <p className="loading-message">Loading orders...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="empty-message">No orders found. Start shopping now!</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-card-header">
                  <h3>Order ID : {order.order_id}</h3>
                </div>

                <div className="order-card-body">
                  <img
                    src={order.image_url}
                    alt={order.name}
                    className="order-product-image"
                  />

                  <div className="order-details">
                    <h2 className="product-name">{order.name}</h2>

                    <p>{order.description}</p>

                    <p>
                      <strong>Quantity :</strong> {order.quantity}
                    </p>

                    <p>
                      <strong>Price / Unit :</strong>₹
                      {Number(order.price_per_unit).toFixed(2)}
                    </p>

                    <p>
                      <strong>Total Price :</strong>₹
                      {Number(order.total_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
