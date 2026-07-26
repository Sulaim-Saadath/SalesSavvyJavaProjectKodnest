import { useState } from "react";
import CustomModal from "../components/CustomModal";
import "../css/AdminDashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [modalType, setModalType] = useState("");
  const [response, setResponse] = useState(null);

  const cardData = [
    {
      title: "Add Product",
      description: "Easily add products to your store.",
      team: "Product Management",
      modalType: "addProduct",
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

  return (
    <div>
      <Header />
      <div className="admin-dashboard">
        <main className="dashboard-content">
          <div className="card-grid">
            {cardData.map((card, index) => (
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
