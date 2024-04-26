import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'
export default function AddRetailer() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    company: '',
    username: '',
    email: '',
    address: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    return nameRegex.test(name);
  };

  const validateDateOfBirth = (dateOfBirth) => {
    return dateOfBirth !== '';
  };

  const validateContact = (contact) => {
    return contact.length === 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address.');
        setMessage('');
        return;
      }

      if (!validateName(formData.fullname)) {
        setError('Name must only contain alphanumeric characters and underscores.');
        setMessage('');
        return;
      }

      if (!validateDateOfBirth(formData.dateofbirth)) {
        setError('Please enter your date of birth.');
        setMessage('');
        return;
      }

      if (!validateContact(formData.contact)) {
        setError('Contact number must be 10 digits.');
        setMessage('');
        return;
      }

      const response = await axios.post('${config.url}/addretailer', formData);
      if (response.status === 200) {
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          company: '',
          username: '',
          email: '',
          address: '',
          contact: ''
        });
      }
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div>
      <h3 align="center"><u>Add Retailer</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>
      }

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Shop Name</label>
          <input type="text" id="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address</label>
          <textarea type="text" id="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
