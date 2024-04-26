import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import RetailerHome from './RetailerHome';
import RetailerProfile from './RetailerProfile';
import UpdateRetailerProfile from './UpdateRetailerProfile';
import AddProduct from './AddProduct';
import ViewDelivers from './ViewDelivers'; 
import MyProductsPage from './MyProductsPage'
import './retailer.css';


export default function RetailerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isRetailerLoggedIn');
    localStorage.removeItem('retailer');

    navigate('/retailerlogin');
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/retailerhome">Home</Link></li>
          <li className="dropdown">
            <button className="dropbtn">Profile</button>
            <div className="dropdown-content">
              <Link to="/retailerprofile">View Profile</Link>
              <Link to="/updateretailerprofile">Update Profile</Link>
            </div>
          </li>
          <li><Link to="/addproduct">Add Product</Link></li> 
          <li><Link to="/viewdelivers">View Delivery's</Link></li> 
          <li><Link to="/myproducts">My Products</Link></li>
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/retailerhome" element={<RetailerHome />} exact />
        <Route path="/retailerprofile" element={<RetailerProfile />} exact />
        <Route path="/updateretailerprofile" element={<UpdateRetailerProfile />} exact />
        <Route path="/addproduct" element={<AddProduct />} exact />
        <Route path="/myproducts" element={<MyProductsPage />} />
        <Route path="/viewdelivers" element={<ViewDelivers />} exact /> 
      </Routes>
    </div>
  );
}
