import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PurchaseProduct.css'; // Import CSS file
import config from '../config'

export default function PurchaseProduct() {
  const [customerData, setCustomerData] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDescription, setShowDescription] = useState({});
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [autoOrderProductId, setAutoOrderProductId] = useState(''); // Track product for auto-order
  const [autoOrderTimeline, setAutoOrderTimeline] = useState('');
  
  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPurchaseMessage('');
      setError('');
    }, 5000); // Clear message after 5 seconds

    return () => clearTimeout(timeout);
  }, [purchaseMessage, error]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewproducts`);
      setProducts(response.data);
      setFilteredProducts(response.data);
      // Initialize showDescription state for each product as false initially
      const initialShowDescriptionState = response.data.reduce((acc, curr) => {
        acc[curr._id] = false;
        return acc;
      }, {});
      setShowDescription(initialShowDescriptionState);
    } catch (error) {
      console.error(error.message);
      setError('Error fetching products. Please try again later.');
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
    filterProducts(searchTerm, selectedCategory);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterProducts(term, categoryFilter);
  };

  const filterProducts = (term, category) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (term) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  const purchaseProduct = async (productId, customerEmail) => {
    try {
      const response = await axios.post(`${config.url}/buyproduct`, { productId, customerEmail });
      
      if (response.status === 200 && response.data === 'Purchase Successful') {
        setPurchaseMessage('Purchase Successful');
        fetchProducts(); // Refresh products after successful purchase
      } else if (response.status === 200 && response.data === 'Product is out of stock') {
        setError('Product is out of stock. Please try again later.');
      } else if (response.status === 200 && response.data === 'OOPS ... You have already bought this Product') {
        setError('You have already bought this product.');
      } else {
        setError('Error buying product. Please try again later.');
      }
    } catch (error) {
      console.error(error.message);
      setError('Error buying product. Please try again later.');
    }
  };
  

  const toggleDescription = (productId) => {
    setShowDescription(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const handleAutoOrder = (productId) => {
    // Implement auto order logic here for productId
    console.log('Auto order initiated for product:', productId, 'with timeline:', autoOrderTimeline);
    // Simulate success message
    setPurchaseMessage(`Auto-ordering successful for ${autoOrderTimeline} days for productid : ${productId}`);
  };

  const handleAutoOrderClick = (productId) => {
    // Set auto order product ID
    setAutoOrderProductId(productId);
  };

  const handleTimelineChange = (event) => {
    setAutoOrderTimeline(event.target.value);
  };

  return (
    <div>
      <h3>Available Products</h3>
      <div className="message-container">
        {error && <div className="error-message">{error}</div>}
        {purchaseMessage && <div className="success-message">{purchaseMessage}</div>}
      </div>
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select id="categoryFilter" value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Belts">Belts</option>
            <option value="Food">Food</option>
            <option value="Medicines">Medicines</option>
            <option value="Pets(PreOwned)">Pets(PreOwned)</option>
            <option value="Pets(NewlyBorn)">Pets(NewlyBorn)</option>
            <option value="Toys">Toys</option>
            <option value="Treats">Treats</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="filter-item">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="product-container">
      {filteredProducts.map(product => (
  <div key={product._id} className="product-card">
    <h4>{product.name}</h4>
    <p>Category: {product.category}</p>
    <p>Price: ₹{product.price}</p>
    <p>Available Quantity: {product.quantity}</p>
    {showDescription[product._id] && <p>Description: {product.description}</p>}
    {product.category.toLowerCase().includes('pets') ? (
      <button onClick={() => purchaseProduct(product._id, customerData.email)}>Adopt Now</button>
    ) : (
      <button onClick={() => purchaseProduct(product._id, customerData.email)}>Buy Now</button>
    )}
    <button onClick={() => toggleDescription(product._id)}>
      {showDescription[product._id] ? 'Hide Description' : 'View Description'}
    </button>
    <div className="auto-order-section">
      {autoOrderProductId === product._id ? (
        <div className="auto-order-ui">
          <select value={autoOrderTimeline} onChange={handleTimelineChange}>
            <option value="">Select Timeline</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
          </select>
          <button onClick={() => handleAutoOrder(product._id)}>Perform Auto Order</button>
        </div>
      ) : (
        <button onClick={() => handleAutoOrderClick(product._id)}>Auto Order</button>
      )}
    </div>
  </div>
))}

    </div>
  </div>
);
}

