import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import CustomerNavBar from './customer/CustomerNavBar';
import AdminNavBar from './admin/AdminNavBar';
import MainNavBar from './main/MainNavBar';
import './App.css'
import RetailerNavBar from './retailer/RetailerNavBar';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isRetailerLoggedIn, setIsRetailerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const CustomerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';
    const retailerLoggedIn = localStorage.getItem('isRetailerLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsCustomerLoggedIn(CustomerLoggedIn);
    setIsRetailerLoggedIn(retailerLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onCustomerLogin = () => {
    localStorage.setItem('isCustomerLoggedIn', 'true');
    setIsCustomerLoggedIn(true);
  };

  const onRetailerLogin = () => {
    localStorage.setItem('isRetailerLoggedIn', 'true');
    setIsRetailerLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>PAWS AND PALACE</h1>
      <Router>
      {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isCustomerLoggedIn ? (
          <CustomerNavBar />
        ) : isRetailerLoggedIn ? (
          <RetailerNavBar />
        ) : (
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onCustomerLogin={onCustomerLogin}
            onRetailerLogin={onRetailerLogin}
          />
        )}
      </Router>
    </div>
  );
}


export default App;