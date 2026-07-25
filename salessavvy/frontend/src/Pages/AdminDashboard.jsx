import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomModal from "../components/CustomModal";
import "./AdminDashboard.css";
import "../components/DashboardCard.css";
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
    {
      title: "Monthly Business",
      description: "view revenue metrics for specific months",
      team: "Analytics",
      modalType: "monthlyBusiness",
    },
    {
      title: "Yearly Business",
      description: "Analyze annual revenue performance",
      team: "Analytics",
      modalType: "yearlyBusiness",
    },
    {
      title: "Overall Business",
      description: "View total revenue since inception",
      team: "Analytics",
      modalType: "overallBusiness",
    },
    {
      title: "Day Business",
      description: "Track daily revenue and transactions",
      team: "Analytics",
      modalType: "dailyBusiness",
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

      console.log("Status:", response.status);

      if (!response.ok) {
        const error = await response.text();
        console.log("Backend Error:", error);
        return;
      }

      // Convert response to JavaScript object
      const data = await response.json();
      console.log(data);
      // Store response data for displaying in the modal
      setResponse(data);

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

        // Show response modal
        setResponse({
          message: "Product deleted successfully",
        });

        setModalType("deleteResponse");
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

  // Handles Yearly Business request
  const handleYearlyBusiness = async (data) => {
    try {
      // Send request to fetch yearly business details
      const response = await fetch(
        `http://localhost:9090/admin/business/yearly?year=${data?.year}`,
        {
          method: "GET", // HTTP GET request
          credentials: "include", // Include authentication cookie
          headers: {
            "Content-Type": "application/json", // Sending JSON data
          },
        },
      );

      // Check if request is successful
      if (response.ok) {
        const data = await response.json();

        // Store yearly business data
        setResponse({ yearlyBusiness: data });

        // Show yearly business modal
        setModalType("yearlyBusiness");
      } else {
        // Read error message
        const errorMessage = await response.text();

        // Store error response
        setResponse({
          message: `Error: ${errorMessage}`,
        });

        // Show response modal
        setModalType("response");
      }
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching yearly business details:", error);

      // Store generic error message
      setResponse({
        message: "Error: Something went wrong",
      });

      // Show response modal
      setModalType("response");
    }
  };

  // Handles Overall Business request
  const handleOverallBusiness = async () => {
    try {
      // Send request to fetch overall business details
      const response = await fetch(
        "http://localhost:9090/admin/business/overall",
        {
          method: "GET", // HTTP GET request
          credentials: "include", // Include authentication cookie
          headers: {
            "Content-Type": "application/json", // Sending JSON data
          },
        },
      );

      // Check if request is successful
      if (response.ok) {
        const data = await response.json();

        // Store overall business data
        setResponse({ overallBusiness: data });

        // Show Overall Business modal
        setModalType("overallBusiness");
      } else {
        // Read error message
        const errorMessage = await response.text();

        // Store error response
        setResponse({
          message: `Error: ${errorMessage}`,
        });

        // Show response modal
        setModalType("response");
      }
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching overall business details:", error);

      // Store generic error message
      setResponse({
        message: "Error: Something went wrong",
      });

      // Show response modal
      setModalType("response");
    }
  };

  // Handles Monthly Business request
  const handleMonthlyBusiness = async (data) => {
    try {
      // Send request to fetch monthly business details
      const response = await fetch(
        `http://localhost:9090/admin/business/monthly?month=${data?.month}&year=${data?.year}`,
        {
          method: "GET", // HTTP GET request
          credentials: "include", // Include authentication cookie
          headers: {
            "Content-Type": "application/json", // Sending JSON data
          },
        },
      );

      // Check if request is successful
      if (response.ok) {
        const data = await response.json();

        // Store monthly business data
        setResponse({ monthlyBusiness: data });

        // Show Monthly Business modal
        setModalType("monthlyBusiness");
      } else {
        // Read error message
        const errorMessage = await response.text();

        // Store error response
        setResponse({
          message: `Error: ${errorMessage}`,
        });

        // Show Monthly Business modal
        setModalType("monthlyBusiness");
      }
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching monthly business details:", error);

      // Store generic error message
      setResponse({
        message: "Error: Something went wrong",
      });

      // Show response modal
      setModalType("response");
    }
  };

  // Handles Daily Business request
  const handleDailyBusiness = async (data) => {
    try {
      // Send request to fetch daily business details
      const response = await fetch(
        `http://localhost:9090/admin/business/daily?date=${data?.date}`,
        {
          method: "GET", // HTTP GET request
          credentials: "include", // Include authentication cookie
          headers: {
            "Content-Type": "application/json", // Sending JSON data
          },
        },
      );

      // Check if request is successful
      if (response.ok) {
        const data = await response.json();

        // Store daily business data
        setResponse({ dailyBusiness: data });

        // Show Daily Business modal
        setModalType("dailyBusiness");
      } else {
        // Read error message
        const errorMessage = await response.text();

        // Store error response
        setResponse({
          message: `Error: ${errorMessage}`,
        });

        // Show response modal
        setModalType("response");
      }
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching daily business details:", error);

      // Store generic error message
      setResponse({
        message: "Error: Something went wrong",
      });

      // Show response modal
      setModalType("response");
    }
  };
  return (
    <div>
      <Header />
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
                // onClick={() => {
                //   alert("Clicked");
                //   console.log(card.modalType);
                //   setModalType(card.modalType);
                // }}
                onClick={() => {
                  console.log(card.modalType);
                  setModalType(card.modalType);
                  setModalData(null);
                  // setModalType(card.modalType);
                  // setModalData(null); // Clear previous response
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
                console.log("Delete Submit:", data);
                handleDeleteProductSubmit(data);
              }

              if (modalType === "viewUser") {
                handleViewUserSubmit(data);
              }

              // Handle Modify User form submission
              if (modalType === "modifyUser") {
                handleModifyUserSubmit(data);
              }

              if (modalType === "yearlyBusiness") {
                handleYearlyBusiness(data);
              }

              if (modalType === "overallBusiness") {
                handleOverallBusiness();
              }

              if (modalType === "monthlyBusiness") {
                handleMonthlyBusiness(data);
              }

              if (modalType === "dailyBusiness") {
                handleDailyBusiness(data);
              }
            }}
            // Pass response data to the modal
            response={response}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
