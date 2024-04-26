import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import CustomerLogin from './CustomerLogin';
import UpdateCustomerProfile from './UpdateCustomerProfile';
import PurchaseProduct from './PurchaseProduct';
import MyOrders from './MyOrders'; // Import the new component
import AddProduct from './AddProduct';
import MyProductsPage from './MyProductsPage';

import './style.css';

export default function CustomerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    localStorage.removeItem('customer');

    navigate('/customerlogin');
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <button className="dropbtn">Profile</button>
            <div className="dropdown-content">
              <Link to="/customerprofile">View Profile</Link>
              <Link to="/updatecustomerprofile">Update Profile</Link>
            </div>
          </li>
          <li><Link to="/buyproduct">Purchase Product</Link></li>
          <li><Link to="/myorders">My Orders</Link></li> 
          <li><Link to="/addproduct">Add Pre Owned Pets</Link></li>
          <li><Link to="/myproducts">My Products</Link></li>
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/customerprofile" element={<CustomerProfile />} exact />
        <Route path="/updatecustomerprofile" element={<UpdateCustomerProfile />} exact />
        <Route path="/customerlogout" element={<CustomerLogin />} exact />
        <Route path="/buyproduct" element={<PurchaseProduct />} exact />
        <Route path="/addproduct" element={<AddProduct />} exact />
        <Route path="/myproducts" element={<MyProductsPage />} />
        <Route path="/myorders" element={<MyOrders />} exact /> {/* Route for My Orders */}
      </Routes>
    </div>
  );
}
