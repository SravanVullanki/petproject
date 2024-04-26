import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerString = localStorage.getItem('customer');
    if (!customerString) {
      // Handle the case where customer data is not available
      console.error('Customer data not found in local storage');
      setLoading(false);
      return;
    }

    const customer = JSON.parse(customerString);
    const customerEmail = customer.email;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.url}/myproducts/${customerEmail}`);
        setProducts(response.data.filter(product => product.category === 'PreOwnedPets'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Products</h2>
      <div className="product-container">
        {products.length === 0 ? (
          <p>No products found for this user.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Description: {product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;
