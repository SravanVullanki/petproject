import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './admin.css'; 
import AdminHome from './AdminHome';
import ViewCustomers from './ViewCustomers';
import ViewRetailers from './ViewRetailers'
import AddRetailer from './AddRetailer'
import ViewRetailerApplicants from './ViewRetailerApplicants'
import config from '../config'
export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload()
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/viewcustomers">View Customers</Link></li>
          <li><Link to="/addretailer">Add Retailer</Link></li>
          <li><Link to="/viewretailers">View Retailers</Link></li>
          <li><Link to="/viewretailerapplicants">View Retailer Applicants </Link></li>
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>

        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AdminHome />} exact />
        <Route path="/viewcustomers" element={<ViewCustomers />} exact />
        <Route path="/viewretailerapplicants"  element={<ViewRetailerApplicants />} exact />
        <Route path="/addretailer" element={<AddRetailer />} exact />
        <Route path="/viewretailers" element={<ViewRetailers />} exact />
      </Routes>
    </div>
  );
}
