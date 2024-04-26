import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import config from '../config'

export default function Registration() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
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

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
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

      if (formData.contact.length !== 10) {
        setError('Contact number must be 10 digits.');
        setMessage('');
        return;
      }

      if (!validatePassword(formData.password)) {
        setError('Password must be at least 8 characters long and contain at least 1 special symbol.');
        setMessage('');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        setMessage('');
        return;
      }

      const response = await axios.post(`${config.url}/insertcustomer`, {
        ...formData,
        confirmPassword: undefined 
      });

      if (response.status === 200) {
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          confirmPassword: '', 
          location: '',
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
    <div className="registration-container">
      <h3 align="center"><u> Customer Registration</u></h3>
      {
        message ? <h4 align="center" className="success-message">{message}</h4> : <h4 align="center" className="error-message">{error}</h4>
      }

      <form onSubmit={handleSubmit} className="registration-form">
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
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
          <div className="password-rules">
            Password must be at least 8 characters long and contain at least 1 special symbol.
          </div>
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
