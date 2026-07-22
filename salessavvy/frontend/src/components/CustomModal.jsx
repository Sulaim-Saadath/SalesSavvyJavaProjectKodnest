{
  /* Show Add Product form only when Add Product card is clicked */
}
{
  modalType === "addProduct" && (
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
  );
}

{
  /* Show Delete Product form only when Delete Product card is clicked */
}
{
  modalType === "deleteProduct" && (
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
  );
}
{
  /* Show View User form only when View User card is clicked */
}
{
  modalType === "viewUser" && (
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
  );
}

{
  /* Show Modify User form only when Modify User card is clicked */
}
{
  modalType === "modifyUser" && (
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
  );
}
