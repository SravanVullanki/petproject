import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './retailer.css';
import config from '../config'

export default function UpdateRetailerProfile() {
  const [retailerData, setRetailerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    company:'',
    username:'',
    email: '',
    password: '',
    address: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialRetailerData, setInitialRetailerData] = useState({});

  useEffect(() => {
    const storedRetailerData = localStorage.getItem('retailer');
    if (storedRetailerData) {
      const parsedRetailerData = JSON.parse(storedRetailerData);
      setRetailerData(parsedRetailerData);
      setInitialRetailerData(parsedRetailerData);
    }
  }, []);

  const handleChange = (e) => {
    setRetailerData({ ...retailerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in retailerData) {
        if (retailerData[key] !== initialRetailerData[key] && initialRetailerData[key] !== '') {
          updatedData[key] = retailerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = retailerData.email;
        const response = await axios.put('${config.url}/updateretailerprofile', updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/retailerprofile/${retailerData.email}`);
        localStorage.setItem("retailer", JSON.stringify(res.data));
      } else {
        // No changes
        setMessage("No Changes in Retailer Profile");
        setError("");
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  return (
    <div>
      <h3 align="center"><u>Update Profile</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{ color: 'red' }}>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={retailerData.fullname} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" id="gender" value={retailerData.gender} readOnly />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={retailerData.dateofbirth} readOnly />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={retailerData.email} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={retailerData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Company</label>
          <input type="text" id="company" value={retailerData.company} readOnly />
        </div>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={retailerData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" id="address" value={retailerData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={retailerData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
