import { useState } from "react";
import "../css/CustomModal.css";
function CustomModal({
  modalType,
  onClose,
  onSubmit,
  response,
  userFormData,
  setUserFormData,
  handleModifyUserSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
    description: "",
    productId: " ",
  });
  const [inputValue, setInputValue] = useState("");
  const handleGeneralInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    switch (modalType) {
      case "addProduct":
        onSubmit(formData);
        break;

      case "deleteProduct":
        onSubmit({ productId: inputValue });
        break;

      case "viewUser":
        onSubmit({ userId: inputValue });
        break;

      case "modifyUser":
        handleModifyUserSubmit({ userId: inputValue });
        break;

      case "overallBusiness":
        onSubmit();
        break;

      default:
        break;
    }
  };
  return (
    <div className="modal-overlay">
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

              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
              >
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
              <button
                type="button"
                className="delete-btn"
                onClick={handleSubmit}
              >
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

        {modalType === "viewUser" && (
          <>
            <h2>View User Details</h2>
            <form className="modal-form">
              <div className="modal-form-item">
                <label htmlFor="userId">User ID</label>
                <input
                  type="number"
                  id="userId"
                  placeholder="Enter User ID"
                  value={inputValue}
                  onChange={handleGeneralInputChange}
                />
              </div>
            </form>
            <div className="modal-buttons">
              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}
        {modalType === "viewUserResponse" && (
          <>
            <h2>User Details</h2>
            {response?.user ? (
              <div className="modal-form">
                <div className="modal-form-item">
                  <label>User ID</label>
                  <input type="text" value={response.user.userId} readOnly />
                </div>
                <div className="modal-form-item">
                  <label>Username</label>
                  <input type="text" value={response.user.username} readOnly />
                </div>
                <div className="modal-form-item">
                  <label>Email</label>
                  <input type="email" value={response.user.email} readOnly />
                </div>
                <div className="modal-form-item">
                  <label>Role</label>
                  <input type="text" value={response.user.role} readOnly />
                </div>
              </div>
            ) : (
              <p>{response?.message}</p>
            )}
            <div className="modal-buttons">
              <button className="submit-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {modalType === "modifyUser" && (
          <>
            <h2>Modify User</h2>

            <input
              type="number"
              placeholder="Enter User ID"
              value={inputValue}
              onChange={handleGeneralInputChange}
            />

            <div className="modal-buttons">
              <button
                className="submit-btn"
                onClick={() => handleModifyUserSubmit({ userId: inputValue })}
              >
                Fetch User
              </button>

              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {modalType === "editUser" && (
          <>
            <h2>Modify User</h2>

            <form className="modal-form">
              <div className="modal-form-item">
                <label>User ID</label>
                <input type="text" value={userFormData.userId} readOnly />
              </div>

              <div className="modal-form-item">
                <label>Username</label>
                <input
                  type="text"
                  value={userFormData.username}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      username: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-form-item">
                <label>Email</label>
                <input
                  type="email"
                  value={userFormData.email}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-form-item">
                <label>Role</label>
                <select
                  value={userFormData.role}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </form>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={() => handleModifyUserSubmit(userFormData)}
              >
                Update User
              </button>
            </div>
          </>
        )}

        {modalType === "response" && (
          <>
            {response?.user ? (
              <>
                <h2>✅ User Updated Successfully</h2>

                <div className="modal-form">
                  <p>
                    <strong>User ID:</strong> {response.user.userId}
                  </p>

                  <p>
                    <strong>Username:</strong> {response.user.username}
                  </p>

                  <p>
                    <strong>Email:</strong> {response.user.email}
                  </p>

                  <p>
                    <strong>Role:</strong> {response.user.role}
                  </p>

                  <button className="submit-btn" onClick={onClose}>
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Response</h2>

                <p>{response?.message}</p>

                <button className="submit-btn" onClick={onClose}>
                  Close
                </button>
              </>
            )}
          </>
        )}

        {modalType === "monthlyBusiness" && (
          <>
            <h2>Monthly Business</h2>
            <form className="modal-form">
              <div className="modal-form-item">
                <label htmlFor="month">Month</label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  placeholder="Enter Month (1-12)"
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-form-item">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="Enter Year"
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="modal-buttons">
              <button
                className="submit-btn"
                onClick={() =>
                  onSubmit({
                    month: formData.month,
                    year: formData.year,
                  })
                }
              >
                Submit
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {modalType === "monthlyBusinessResponse" && (
          <>
            <h2>Monthly Business</h2>

            {response?.monthlyBusiness ? (
              <div className="modal-form">
                <div className="modal-form-item">
                  <label>Total Business</label>

                  <input
                    type="text"
                    value={response.monthlyBusiness.totalRevenue?.toFixed(2)}
                    readOnly
                  />
                </div>

                <div className="modal-form-item">
                  <label>Category Sales</label>

                  <div>
                    {Object.keys(
                      response.monthlyBusiness.categorySales || {},
                    ).map((key) => (
                      <div key={key} className="business-response-item">
                        <strong>{key}</strong>

                        <span>
                          {response.monthlyBusiness.categorySales[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>{response?.message}</p>
            )}

            <div className="modal-buttons">
              <button className="submit-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {modalType === "dailyBusiness" && (
          <>
            <h2>Daily Business</h2>
            <form className="modal-form">
              <div className="modal-form-item">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="modal-buttons">
              <button
                className="submit-btn"
                onClick={() =>
                  onSubmit({
                    date: formData.date,
                  })
                }
              >
                Submit
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {modalType === "dailyBusinessResponse" && (
          <>
            <h2>Daily Business</h2>

            {response?.dailyBusiness ? (
              <div className="modal-form">
                <div className="modal-form-item">
                  <label>Total Business</label>
                  <input
                    type="text"
                    value={response.dailyBusiness.totalRevenue?.toFixed(2)}
                    readOnly
                  />
                </div>
                <div className="modal-form-item">
                  <label>Category Sales</label>
                  <div>
                    {Object.keys(
                      response.dailyBusiness.categorySales || {},
                    ).map((key) => (
                      <div key={key} className="business-response-item">
                        <strong>{key}</strong>

                        <span>{response.dailyBusiness.categorySales[key]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>{response?.message}</p>
            )}
            <div className="modal-buttons">
              <button className="submit-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {modalType === "yearlyBusiness" && (
          <>
            <h2>Yearly Business</h2>
            <form className="modal-form">
              <div className="modal-form-item">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="Enter Year"
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="modal-buttons">
              <button
                className="submit-btn"
                onClick={() =>
                  onSubmit({
                    year: formData.year,
                  })
                }
              >
                Submit
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {modalType === "yearlyBusinessResponse" && (
          <>
            <h2>Yearly Business</h2>
            {response?.yearlyBusiness ? (
              <div className="modal-form">
                <div className="modal-form-item">
                  <label>Total Business</label>
                  <input
                    type="text"
                    value={response.yearlyBusiness.totalRevenue?.toFixed(2)}
                    readOnly
                  />
                </div>
                <div className="modal-form-item">
                  <label>Category Sales</label>
                  <div>
                    {Object.keys(
                      response.yearlyBusiness.categorySales || {},
                    ).map((key) => (
                      <div key={key} className="business-response-item">
                        <strong>{key}</strong>
                        <span>
                          {response.yearlyBusiness.categorySales[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>{response?.message}</p>
            )}
            <div className="modal-buttons">
              <button className="submit-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {modalType === "overallBusiness" && (
          <>
            <h2>Overall Business</h2>
            <div className="modal-buttons">
              <button className="submit-btn" onClick={handleSubmit}>
                Get Overall Business
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {modalType === "overallBusinessResponse" && (
          <>
            <h2>Overall Business</h2>
            {response?.overallBusiness ? (
              <div className="modal-form">
                <div className="modal-form-item">
                  <label>Total Business</label>
                  <input
                    type="text"
                    value={response.overallBusiness.totalRevenue?.toFixed(2)}
                    readOnly
                  />
                </div>
                <div className="modal-form-item">
                  <label>Category Sales</label>
                  <div>
                    {Object.keys(
                      response.overallBusiness.categorySales || {},
                    ).map((key) => (
                      <div key={key} className="business-response-item">
                        <strong>{key}</strong>

                        <span>
                          {response.overallBusiness.categorySales[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>{response?.message}</p>
            )}
            <div className="modal-buttons">
              <button className="submit-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomModal;
