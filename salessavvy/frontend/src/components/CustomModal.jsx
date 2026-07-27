import { useState } from "react";
import "../css/CustomModal.css";
function CustomModal({ modalType, onClose, onSubmit, response }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
    description: "",
    productId: " ",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };
  return (
    <div className="modal">
      {modalType === "addProduct" && (
        <>
          <h3>📦 Add Product</h3>
          <form className="modal-form">
            <div className="modal-form-item">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-form-item">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-form-item">
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-form-item">
              <label htmlFor="categoryId">Category ID:</label>
              <input
                type="number"
                id="categoryId"
                name="categoryId"
                placeholder="Category ID"
                value={formData.categoryId}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-form-item">
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-form-item">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </form>
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="button" className="submit-btn" onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </>
      )}
      {modalType === "response" && response?.productData && (
        <>
          <h2>✅ Product Added Successfully</h2>
          <div style={{ textAlign: "center" }}>
            <img
              src={response.imageUrl}
              alt={response.product.name}
              width="180"
              style={{ borderRadius: "10px" }}
            />
            <h3>{response.productData.name}</h3>
            <p>
              <b>Price:</b> ₹{response.productData.price}
            </p>
            <p>
              <b>Stock:</b> {response.productData.stock}
            </p>
            <p>
              <b>Category ID:</b> {response.productData.categoryId}
            </p>
            <button className="submit-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
      {modalType === "deleteProduct" && (
        <>
          <h2>Delete Product</h2>
          <form className="modal-form">
            <div className="modal-form-item">
              <label htmlFor="productId">Product ID</label>
              <input
                type="number"
                id="productId"
                name="productId"
                placeholder="Enter Product ID"
                value={formData.productId}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="delete-btn" onClick={handleSubmit}>
              Delete Product
            </button>
          </div>
        </>
      )}

      {modalType === "response" &&
        response?.message &&
        !response.productData && (
          <>
            <h2>🗑 Product Deleted</h2>
            <p>{response.message}</p>
            <button className="submit-btn" onClick={onClose}>
              Close
            </button>
          </>
        )}
    </div>
  );
}

export default CustomModal;
