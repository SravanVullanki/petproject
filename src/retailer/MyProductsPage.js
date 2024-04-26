import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProduct.css';
import config from '../config'

// Define category options
const categoryOptions = ['Belts', 'Food', 'Medicines', 'Pets(PreOwned)', 'Pets(NewlyBorn)', 'Toys', 'Treats', 'Others'];

export default function UpdateProduct({ productId }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const retailerString = localStorage.getItem('retailer');
        if (!retailerString) {
          console.error('Retailer data not found in local storage');
          return;
        }
        const retailer = JSON.parse(retailerString);
        const email = retailer.email;
        const response = await axios.get(`${config.url}/myproducts/${email}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data. Please try again later.');
      }
    };
    fetchProductData();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/products/${productId}`, selectedProduct);
      setMessage(response.data);
      setError('');
      setSelectedProduct(null);
      const retailerString = localStorage.getItem('retailer');
      const retailer = JSON.parse(retailerString);
      const email = retailer.email;
      const updatedResponse = await axios.get(`${config.url}/myproducts/${email}`);
      setProducts(updatedResponse.data);
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div className="update-product-container">
      <h3>Update Product</h3>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="product-cards">
        {products.map((product) => (
          <div key={product.productId} className="product-card">
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Company: {product.company}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => handleUpdateClick(product)}>Update</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="update-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={selectedProduct.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select id="category" value={selectedProduct.category} onChange={handleChange} required>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" value={selectedProduct.price} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input type="text" id="quantity" value={selectedProduct.quantity} disabled />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" value={selectedProduct.description} onChange={handleChange} required />
            </div>
            <div>
              <label>Company:</label>
              <span>{selectedProduct.company}</span>
            </div>
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}
    </div>
  );
}
