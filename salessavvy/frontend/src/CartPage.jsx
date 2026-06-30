import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  // Stores all cart products
  const [cartItems, setCartItems] = useState([]);

  // Stores total price including shipping
  const [overallPrice, setOverallPrice] = useState(0);

  // Stores logged-in username
  const [username, setUsername] = useState("");

  // Stores total price of products only
  const [subtotal, setSubtotal] = useState(0);

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/cart/items", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();

      setCartItems(
        data?.cart?.products?.map((item) => ({
          ...item,
          total_price: parseFloat(item.total_price).toFixed(2),
          price_per_unit: parseFloat(item.price_per_unit).toFixed(2),
        })) || [],
      );

      setOverallPrice(
        parseFloat(data?.cart?.overall_total_price || 0).toFixed(2),
      );

      setUsername(data?.username || "");
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  useEffect(() => {
    const total = cartItems
      .reduce((total, item) => total + parseFloat(item.total_price), 0)
      .toFixed(2);

    setSubtotal(total);
  }, [cartItems]);

  // Function called when user clicks the "Remove" button
  const handleRemoveItem = async (productId) => {
    try {
      // Send DELETE request to backend to remove item from cart
      const response = await fetch("http://localhost:9090/api/cart/delete", {
        method: "DELETE",

        // Send request body as JSON
        headers: {
          "Content-Type": "application/json",
        },

        // Include authentication cookie (JWT token)
        credentials: "include",

        // Send username and productId
        body: JSON.stringify({
          username,
          productId,
        }),
      });

      // 204 = Item successfully deleted
      if (response.status === 204) {
        // Remove item from React state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== productId),
        );
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function called when user clicks + or - button
  const handleQuantityChange = async (productId, newQuantity) => {
    console.log("Product:", productId, "New Quantity:", newQuantity);
    try {
      // // Remove item if quantity becomes 0
      // if (newQuantity <= 0) {
      //   handleRemoveItem(productId);
      //   return;
      // }

      // Send updated quantity to backend
      const response = await fetch("http://localhost:9090/api/cart/update", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          username,
          productId,
          quantity: newQuantity,
        }),
      });
      console.log("Status:", response.status);

      const responseText = await response.text();
      console.log("Response:", responseText);

      if (response.ok) {
        await fetchCartItems();
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  console.log(cartItems);

  // Data to send for Razorpay order creation
  const handleCheckout = async () => {
    try {
      const requestBody = {
        totalAmount: subtotal,
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      // Create Razorpay order
      const response = await fetch("http://localhost:9090/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      // Stop if order creation failed
      if (!response.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      // Read Razorpay order details
      const razorpayOrderId = await response.text(); // response.text() => converts the backend JSON response into a String.

      // Razorpay configuration
      const options = {
        key: "rzp_test_T6uwtR7zR6HuId",
        amount: subtotal * 100, // Convert ₹ to paise
        currency: "INR",
        name: "SalesSavvy",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async function (response) {
          // handler is automatically called by Razorpay after a successful payment.
          try {
            // Verify payment with backend
            const verifyResponse = await fetch(
              "http://localhost:9090/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              },
            );
            const result = await verifyResponse.text();
            if (verifyResponse.ok) {
              alert("Payment verified successfully!");
              navigate("/CustomerHome");navigate("/CustomerHome");
            } else {
              alert("Payment verification failed: " + result);
            }
          } catch (error) {
            console.error("Error verifying payment: ", error);
            alert("Payment verifcation failed, please try again.");
          }
        },
        // Customer details shown in Razorpay
        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Payment failed. Please try again.");
      console.error("Error during checkout: ", error);
    }
  };

  return (
    <div className="cart-page">
      <Header cartCount={cartItems.length} username={username} />

      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">Your cart is empty 🛒</div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.product_id} className="cart-item">
                <img src={item.product_image} alt={item.product_name} />

                <div className="cart-details">
                  <h3>{item.product_name}</h3>

                  <p className="cart-price">₹{item.price_per_unit}</p>
                </div>
                <button
                  className="quantity-btn"
                  onClick={() => {
                    console.log("MINUS CLICKED");
                    handleQuantityChange(item.product_id, -1);
                  }}
                >
                  -
                </button>

                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.product_id, 1)}
                >
                  +
                </button>
                <div className="item-total">₹{item.total_price}</div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.product_id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <div className="subtotal">Subtotal: ₹{subtotal}</div>

              <div className="subtotal">Total: ₹{overallPrice}</div>
 
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
