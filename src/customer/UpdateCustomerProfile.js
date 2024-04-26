import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css';
import config from '../config'

export default function UpdateCustomerProfile() {
  const [customerData, setCustomerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialCustomerData, setInitialCustomerData] = useState({});

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
      setInitialCustomerData(parsedCustomerData); // Store initial customer  data
    }
  }, []);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in customerData) {
        if (customerData[key] !== initialCustomerData[key] && initialCustomerData[key] !== '') {
          updatedData[key] = customerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = customerData.email;
        const response = await axios.put(`${config.url}/updatecustomerprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/customerprofile/${customerData.email}`, updatedData)
        localStorage.setItem("customer",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in Customer Profile");
        setError("");
      }
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  
  return (
    <div>
      <h3 align="center"><u>Update Profile</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={customerData.fullname} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" id="gender" value={customerData.gender} readOnly />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={customerData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={customerData.email} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={customerData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={customerData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={customerData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
