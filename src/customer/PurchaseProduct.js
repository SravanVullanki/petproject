import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PurchaseProduct.css'; 
import config from '../config';
import { Razorpay } from 'razorpay-checkout';
import imageBelts from '../images/belts.png'; 
import imageFood from '../images/food.png';
import imageMedicines from '../images/medicines.png';
import imagePreOwnedPets from '../images/preowned_pets.png';
import imageNewlyBornPets from '../images/newlyborn_pets.png';
import imageToys from '../images/toys.png';
import imageTreats from '../images/treats.png';
import imageOthers from '../images/others.png';

export default function PurchaseProduct() {
  const [customerData, setCustomerData] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDescription, setShowDescription] = useState({});
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [autoOrderProductId, setAutoOrderProductId] = useState('');
  const [autoOrderTimeline, setAutoOrderTimeline] = useState('');

  const categoryImages = {
    Belts: imageBelts,
    Food: imageFood,
    Medicines: imageMedicines,
    'Pets(PreOwned)': imagePreOwnedPets,
    'Pets(NewlyBorn)': imageNewlyBornPets,
    Toys: imageToys,
    Treats: imageTreats,
    Others: imageOthers
  };
  
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
    }, 5000);

    return () => clearTimeout(timeout);
  }, [purchaseMessage, error]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewproducts`);
      setProducts(response.data);
      setFilteredProducts(response.data);
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

  const handleBuyNow = async (productName, productPrice) => {
    const options = {
      key: 'rzp_test_xUIHrkrkhUtUlU',
      amount: productPrice * 100, // Convert price to paise (Razorpay expects price in paise)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Adoption of ' + productName, // Update the description
      image: '/your-company-logo.png',
      handler: function(response) {
        alert('Payment successful');
        // You can add further actions here after successful payment
      },
      prefill: {
        name: customerData?.name || '',
        email: customerData?.email || '',
        contact: customerData?.phone || ''
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

  const toggleDescription = (productId) => {
    setShowDescription(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const handleAutoOrder = (productId) => {
    console.log('Auto order initiated for product:', productId, 'with timeline:', autoOrderTimeline);
    setPurchaseMessage(`Auto-ordering successful for ${autoOrderTimeline} days for productid : ${productId}`);
  };

  const handleAutoOrderClick = (productId) => {
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
            <div className="product-image">
              <img src={categoryImages[product.category]} alt={product.name} />
            </div>
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>
            <p>Available Quantity: {product.quantity}</p>
            {showDescription[product._id] && <p>Description: {product.description}</p>}
            {product.category.toLowerCase().includes('pets') ? (
              <button onClick={() => handleBuyNow(product.name, product.price)}>Adopt Now</button>
            ) : (
              <button onClick={() => handleBuyNow(product.name, product.price)}>Buy Now</button>
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
