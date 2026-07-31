import { useState } from "react";
import CustomModal from "../components/CustomModal";
import "../css/AdminDashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [modalType, setModalType] = useState("");
  const [response, setResponse] = useState(null);

  const productCards = [
    {
      title: "Add Product",
      description: "...",
      team: "Product Management",
      modalType: "addProduct",
    },
    {
      title: "Delete Product",
      description: "...",
      team: "Product Management",
      modalType: "deleteProduct",
    },
  ];

  const userCards = [
    {
      title: "View User Details",
      description: "...",
      team: "User Management",
      modalType: "viewUser",
    },
    {
      title: "Modify User",
      description: "...",
      team: "User Management",
      modalType: "modifyUser",
    },
  ];

  const businessCards = [
    {
      title: "Daily Business",
      description: "...",
      team: "Business Management",
      modalType: "dailyBusiness",
    },
    {
      title: "Monthly Business",
      description: "...",
      team: "Business Management",
      modalType: "monthlyBusiness",
    },
    {
      title: "Yearly Business",
      description: "...",
      team: "Business Management",
      modalType: "yearlyBusiness",
    },
    {
      title: "Overall Business",
      description: "...",
      team: "Business Management",
      modalType: "overallBusiness",
    },
  ];

  const handleAddProductSubmit = async (productData) => {
    try {
      const response = await fetch("http://localhost:9090/admin/products/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      setResponse({
        product: data,
        productData: productData,
        imageUrl: productData.imageUrl,
      });

      setModalType("response");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProductSubmit = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:9090/admin/products/delete",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        setResponse(data);
      } else {
        const errorMessage = await response.text();
        setResponse({
          message: `Error: ${errorMessage}`,
        });
      }
      setModalType("response");
    } catch (error) {
      console.error("Delete Error:", error);
      setResponse({
        message: "Failed to delete product.",
      });
    }
  };

  const handleViewUserSubmit = async ({ userId }) => {
    try {
      const response = await fetch("http://localhost:9090/admin/user/getbyid", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponse({ user: data });
        setModalType("response");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModalType("response");
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
      setResponse({ message: `Error: ${errorMessage}` });
      setModalType("response");
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-dashboard">
        <main className="dashboard-content">
          {/* Product Management */}
          <h2 className="section-title">Product Management</h2>
          <div className="card-grid">
            {productCards.map((card, index) => (
              <div
                key={index}
                className="card"
                onClick={() => {
                  console.log("Card clicked");
                  setModalType(card.modalType);
                }}
              >
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{card.title}</h3>
                    <span className="card-arrow">→</span>
                  </div>

                  <p className="card-description">{card.description}</p>

                  <div className="card-footer">
                    <div className="team-tag">{card.team}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* User Management */}
          <h2 className="section-title">User Management</h2>
          <div className="card-grid">
            {userCards.map((card, index) => (
              <div
                key={index}
                className="card"
                onClick={() => {
                  console.log("Card clicked");
                  setModalType(card.modalType);
                }}
              >
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{card.title}</h3>
                    <span className="card-arrow">→</span>
                  </div>

                  <p className="card-description">{card.description}</p>

                  <div className="card-footer">
                    <div className="team-tag">{card.team}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Business Management */}
          <h2 className="section-title">Business Management</h2>
          <div className="card-grid">
            {businessCards.map((card, index) => (
              <div
                key={index}
                className="card"
                onClick={() => {
                  console.log("Card clicked");
                  setModalType(card.modalType);
                }}
              >
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{card.title}</h3>
                    <span className="card-arrow">→</span>
                  </div>

                  <p className="card-description">{card.description}</p>

                  <div className="card-footer">
                    <div className="team-tag">{card.team}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {modalType && (
          <CustomModal
            modalType={modalType}
            onClose={() => {
              setModalType("");
              setResponse(null);
            }}
            onSubmit={(data) => {
              if (modalType === "addProduct") {
                handleAddProductSubmit(data);
              }

              if (modalType === "deleteProduct") {
                handleDeleteProductSubmit(data.productId);
              }

              if (modalType === "viewUser") {
                handleViewUserSubmit(data);
              }

              // if (modalType === "modifyUser") {
              //   handleModifyUserSubmit(data);
              // }

              // if (modalType === "dailyBusiness") {
              //   handleDailyBusinessSubmit(data);
              // }

              // if (modalType === "monthlyBusiness") {
              //   handleMonthlyBusinessSubmit(data);
              // }

              // if (modalType === "yearlyBusiness") {
              //   handleYearlyBusinessSubmit(data);
              // }

              // if (modalType === "overallBusiness") {
              //   handleOverallBusinessSubmit(data);
              // }
            }}
            response={response}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
export default AdminDashboard;
