import "./CustomModal.css";
import React from "react";

export default function CustomModal({
  modalType,
  onClose,
  onSubmit,
  response,
}) {
  const [formData, setFormData] = React.useState({});
  const [inputValue, setInputValue] = React.useState("");
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGeneralInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e?.preventDefault();

    if (
      modalType === "viewUser" ||
      (modalType === "modifyUser" && !response?.user)
    ) {
      onSubmit(inputValue);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <>
      {modalType === "addProduct" && (
        <>
          <h2>Add Product</h2>

          {/* Add Product Form */}
          <form className="modal-form">
            {/* Product Name */}
            <div className="modal-form-item">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange} // Update form data
              />
            </div>

            {/* Product Price */}
            <div className="modal-form-item">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange} // Update form data
              />
            </div>

            {/* Product Stock */}
            <div className="modal-form-item">
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange} // Update form data
              />
            </div>

            {/* Category ID */}
            <div className="modal-form-item">
              <label htmlFor="categoryId">Category ID:</label>
              <input
                type="number"
                id="categoryId"
                name="categoryId"
                placeholder="Category ID"
                value={formData.categoryId}
                onChange={handleInputChange} // Update form data
              />
            </div>

            {/* Product Image URL */}
            <div className="modal-form-item">
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange} // Update form data
              />
            </div>

            {/* Product Description */}
            <div className="modal-form-item">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange} // Update form data
              ></textarea>
            </div>
          </form>

          {/* Form Actions */}
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </>
      )}

      {modalType === "deleteProduct" && (
        <>
          <h2>Delete Product</h2>

          {/* Delete Product Form */}
          <form className="modal-form">
            {/* Product ID */}
            <div className="modal-form-item">
              <label htmlFor="productId">Product ID:</label>
              <input
                type="number"
                id="productId"
                name="productId"
                placeholder="Product ID"
                value={formData.productId}
                onChange={handleInputChange} // Update form data
              />
            </div>
          </form>

          {/* Form Actions */}
          <button onClick={handleSubmit}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </>
      )}
      {/* Show View User form only when View User card is clicked */}
      {modalType === "viewUser" && (
        <>
          <h2>View User Details</h2>

          {/* User ID Form */}
          <form>
            {/* User ID Input */}
            <input
              type="number"
              placeholder="Enter User ID"
              value={inputValue}
              onChange={handleGeneralInputChange} // Update input value
            />
          </form>

          {/* Form Actions */}
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </>
      )}

      {/* Show Modify User form only when Modify User card is clicked */}
      {modalType === "modifyUser" && (
        <>
          <h2>Modify User</h2>

          {/* Show User ID input if user details are not fetched */}
          {!response?.user ? (
            <form onSubmit={handleSubmit}>
              <div className="modal-form-item">
                <label htmlFor="userId">User ID:</label>
                <input
                  type="number"
                  id="userId"
                  name="userId"
                  placeholder="Enter User ID"
                  value={inputValue}
                  onChange={handleGeneralInputChange} // Update input value
                />
              </div>

              {/* Fetch user details */}
              <button type="submit">Fetch User</button>
            </form>
          ) : (
            /* Show user details after fetching */
            <form onSubmit={handleSubmit}>
              <div className="modal-form-item">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={response.user.username} // Display username
                />
              </div>

              <div className="modal-form-item">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={response.user.email} // Display email
                />
              </div>

              <div className="modal-form-item">
                <label htmlFor="role">Role:</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  defaultValue={response.user.role} // Display role
                />
              </div>

              {/* Update user details */}
              <button type="submit">Update User</button>
            </form>
          )}

          {/* Close modal */}
          <button onClick={onClose}>Cancel</button>
        </>
      )}

      {/* Show Yearly Business form only when Yearly Business card is clicked */}
      {modalType === "yearlyBusiness" && (
        <>
          <h2>Yearly Business</h2>

          {/* Show input form */}
          {!response && (
            <form className="modal-form">
              <div className="modal-form-item">
                <label htmlFor="year">Year:</label>

                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="Enter Year"
                  onChange={handleInputChange} // Update year
                />
              </div>

              {/* Submit year */}
              <button onClick={handleSubmit}>Submit</button>
            </form>
          )}

          {/* Display yearly business details */}
          {response && (
            <div>
              {/* Total business */}
              <div className="business-response-item">
                <div>Total Business: ₹</div>
                <div>{response?.yearlyBusiness?.totalBusiness?.toFixed(2)}</div>
              </div>

              {/* Category-wise sales */}
              <div className="business-response-item">
                <h5>Category Sales</h5>

                {Object.keys(response?.yearlyBusiness?.categorySales).map(
                  (key) => (
                    <div key={key} className="business-response-item">
                      <div>{key}</div>
                      <div>{response?.yearlyBusiness?.categorySales[key]}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Close modal */}
          <button onClick={onClose}>Cancel</button>
        </>
      )}

      {/* Show Overall Business when Overall Business card is clicked */}
      {modalType === "overallBusiness" && (
        <>
          <h2>Overall Business</h2>

          {/* Show button before fetching data */}
          {!response && (
            <button onClick={handleSubmit}>Get Overall Business</button>
          )}

          {/* Display overall business details */}
          {response && (
            <div>
              {/* Total Business */}
              <div className="business-response-item">
                <div>Total Business: ₹</div>
                <div>
                  {response?.overallBusiness?.totalBusiness?.toFixed(2)}
                </div>
              </div>

              {/* Category-wise Sales */}
              <div className="business-response-item">
                <h5>Category Sales</h5>
              </div>

              {Object.keys(response?.overallBusiness?.categorySales).map(
                (key) => (
                  <div key={key} className="business-response-item">
                    <div>{key}</div>
                    <div>{response?.overallBusiness?.categorySales[key]}</div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* Close modal */}
          <button onClick={onClose}>Cancel</button>
        </>
      )}

      {/* Show Monthly Business form only when Monthly Business card is clicked */}
      {modalType === "monthlyBusiness" && (
        <>
          <h2>Monthly Business</h2>

          {/* Show input form before fetching data */}
          {!response && (
            <form className="modal-form">
              {/* Month Input */}
              <div className="modal-form-item">
                <label htmlFor="month">Month:</label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  placeholder="Enter Month (1-12)"
                  onChange={handleInputChange} // Update month
                />
              </div>

              {/* Year Input */}
              <div className="modal-form-item">
                <label htmlFor="year">Year:</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="Enter Year"
                  onChange={handleInputChange} // Update year
                />
              </div>

              {/* Submit request */}
              <button onClick={handleSubmit}>Submit</button>
            </form>
          )}

          {/* Display monthly business details */}
          {response && (
            <div>
              {/* Total Business */}
              <div className="business-response-item">
                <div>Total Business: ₹</div>
                <div>
                  {response?.monthlyBusiness?.totalBusiness?.toFixed(2)}
                </div>
              </div>

              {/* Category-wise Sales */}
              <div className="business-response-item">
                <h5>Category Sales</h5>
              </div>

              {Object.keys(response?.monthlyBusiness?.categorySales).map(
                (key) => (
                  <div key={key} className="business-response-item">
                    <div>{key}</div>
                    <div>{response?.monthlyBusiness?.categorySales[key]}</div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* Close modal */}
          <button onClick={onClose}>Cancel</button>
        </>
      )}

      {/* Show Daily Business form only when Daily Business card is clicked */}
      {modalType === "dailyBusiness" && (
        <>
          <h2>Day Business</h2>

          {/* Show input form before fetching data */}
          {!response && (
            <form className="modal-form">
              {/* Date Input */}
              <div className="modal-form-item">
                <label htmlFor="date">Date:</label>

                <input
                  type="text"
                  id="date"
                  name="date"
                  placeholder="Enter Date (YYYY-MM-DD)"
                  onChange={handleInputChange} // Update date
                />
              </div>

              {/* Submit request */}
              <button onClick={handleSubmit}>Submit</button>
            </form>
          )}

          {/* Display daily business details */}
          {response && (
            <div>
              {/* Total Business */}
              <div className="business-response-item">
                <div>Total Business: ₹</div>
                <div>{response?.dailyBusiness?.totalBusiness?.toFixed(2)}</div>
              </div>

              {/* Category-wise Sales */}
              <div className="business-response-item">
                <h5>Category Sales</h5>
              </div>

              {Object.keys(response?.dailyBusiness?.categorySales).map(
                (key) => (
                  <div key={key} className="business-response-item">
                    <div>{key}</div>
                    <div>{response?.dailyBusiness?.categorySales[key]}</div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* Close modal */}
          <button onClick={onClose}>Cancel</button>
        </>
      )}
    </>
  );
}
