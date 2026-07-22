import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardCard from "../components/DashboardCard";
import CustomModal from "../components/CustomModal";
import "./AdminDashboard.css";
import React from "react";

export default function AdminDashboard() {
  const [modalType, setModalType] = useState(null);
  const [response, setResponse] = useState(null);
  const [modalData, setModalData] = useState(null);
  const cardData = [
    {
      title: "Add Product",
      description: "Create and manage new product listings with validation",
      team: "Product Management",
      modalType: "addProduct",
    },
    {
      title: "Delete Product",
      description: "Remove products from inventory system",
      team: "Product Management",
      modalType: "deleteProduct",
    },
    {
      title: "View User Details",
      description: "Fetch and display details of a specific user",
      team: "User Management",
      modalType: "viewUser",
    },
    {
      title: "Modify User",
      description: "Update user details and manage roles",
      team: "User Management",
      modalType: "modifyUser",
    },
    // Other cards...
  ];

  // Handles Add Product form submission
  const handleAddProductSubmit = async (productData) => {
    try {
      // Send product data to the backend
      const response = await fetch("http://localhost:9090/admin/products/add", {
        method: "POST", // HTTP POST request
        credentials: "include", // Include authentication cookie
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(productData), // Convert object to JSON
      });

      // Convert response to JavaScript object
      const data = await response.json();

      // Store response data for displaying in the modal
      setResponse({
        product: data,
        imageUrl: productData.imageUrl,
      });

      // Switch modal to response view
      setModalType("response");
    } catch (error) {
      // Log error if request fails
      console.error("Error adding product:", error);
    }
  };

  // Handles Delete Product form submission
  const handleDeleteProductSubmit = async ({ productId }) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(
        "http://localhost:9090/admin/products/delete",
        {
          method: "DELETE", // HTTP DELETE request
          credentials: "include", // Include authentication cookie
          headers: {
            "Content-Type": "application/json", // Sending JSON data
          },
          body: JSON.stringify({ productId }), // Convert product ID to JSON
        },
      );

      // Check if product was deleted successfully
      if (response.ok) {
        console.log("Product successfully deleted");

        // Store success response
        setResponse({
          message: "Product deleted successfully",
        });

        // Show response modal
        setModalType("response");
      }
    } catch (error) {
      // Log error if request fails
      console.error("Error deleting product:", error);
    }
  };

  // Handles View User form submission
  const handleViewUserSubmit = async ({ userId }) => {
    try {
      // Send request to fetch user details
      const response = await fetch("http://localhost:9090/admin/user/getbyid", {
        method: "POST", // HTTP POST request
        credentials: "include", // Include authentication cookie
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify({ userId }), // Convert user ID to JSON
      });

      // Check if request is successful
      if (response.ok) {
        const data = await response.json();

        // Store user details
        setResponse({ user: data });

        // Show response modal
        setModalType("response");
      } else {
        // Read error message from backend
        const errorMessage = await response.text();

        // Store error message
        setResponse({
          message: `Error: ${errorMessage}`,
        });

        // Show response modal
        setModalType("response");
      }
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching user details:", error);

      // Store generic error message
      setResponse({
        message: "Error: Something went wrong",
      });

      // Show response modal
      setModalType("response");
    }
  };

  // Handles Modify User functionality
  const handleModifyUserSubmit = async (data) => {
    // Fetch user details using User ID
    if (!data.username) {
      try {
        // Send request to fetch user details
        const response = await fetch(
          "http://localhost:9090/admin/user/getbyid",
          {
            method: "POST", // HTTP POST request
            credentials: "include", // Include authentication cookie
            headers: {
              "Content-Type": "application/json", // Sending JSON data
            },
            body: JSON.stringify({ userId: data.userId }), // Send User ID
          },
        );

        // Check if request is successful
        if (response.ok) {
          const userDetails = await response.json();

          // Store fetched user details
          setResponse({ user: userDetails });

          // Open Modify User form
          setModalType("modifyUser");
        } else {
          // Read error message
          const error = await response.text();

          // Store error response
          setResponse({ message: `Error: ${error}` });

          // Show response modal
          setModalType("response");
        }
      } catch (error) {
        // Log error if request fails
        console.error("Error fetching user details:", error);

        // Store generic error message
        setResponse({ message: "Error: Something went wrong" });

        // Show response modal
        setModalType("response");
      }
    } else {
      // Update user details
      try {
        // Send updated user data
        const response = await fetch(
          "http://localhost:9090/admin/user/modify",
          {
            method: "PUT", // HTTP PUT request
            credentials: "include", // Include authentication cookie
            headers: {
              "Content-Type": "application/json", // Sending JSON data
            },
            body: JSON.stringify(data), // Send updated user details
          },
        );

        // Check if update is successful
        if (response.ok) {
          const updatedUser = await response.json();

          // Store updated user details
          setResponse({ user: updatedUser });

          // Show response modal
          setModalType("response");
        } else {
          // Read error message
          const error = await response.text();

          // Store error response
          setResponse({ message: `Error: ${error}` });

          // Show response modal
          setModalType("response");
        }
      } catch (error) {
        // Log error if update fails
        console.error("Error updating user details:", error);

        // Store generic error message
        setResponse({ message: "Error: Something went wrong" });

        // Show response modal
        setModalType("response");
      }
    }
  };
  return (
    <div>
      <div className="admin-dashboard">
        {/* Main dashboard content */}
        <main className="dashboard-content">
          {/* Grid containing all dashboard cards */}
          <div className="cards-grid">
            {/* Loop through each card */}
            {cardData.map((card, index) => (
              <div
                key={index} // Unique key for each card
                className="card"
                // Open the corresponding modal
                onClick={() => {
                  setModalType(card.modalType);
                  setModalData(null); // Clear previous response
                }}
              >
                {/* Card details */}
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>

                  <p className="card-description">{card.description}</p>

                  <span className="card-team">
                    <p className="teams">Team:</p>
                    {card.team}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Display modal when a card is selected */}
        {modalType && (
          <CustomModal
            modalType={modalType}
            // Close the modal
            onClose={() => {
              setModalType(null);
              setResponse(null);
            }}
            // Handle form submission based on modal type
            onSubmit={(data) => {
              if (modalType === "addProduct") {
                handleAddProductSubmit(data);
              }

              if (modalType === "deleteProduct") {
                handleDeleteProductSubmit(data);
              }

              if (modalType === "viewUser") {
                handleViewUserSubmit(data);
              }

              // Handle Modify User form submission
              if (modalType === "modifyUser") {
                handleModifyUserSubmit(data);
              }
            }}
            // Pass response data to the modal
            response={response}
          />
        )}
      </div>
    </div>
  );
}
