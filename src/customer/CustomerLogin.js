import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../main/login.css';
import config from '../config'

export default function CustomerLogin({ onCustomerLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checkcustomerlogin`, formData);
      if (response.data != null) 
      {
        onCustomerLogin();

        localStorage.setItem('customer', JSON.stringify(response.data));

        navigate("/customerrhome");
      } 
      else 
      {
        setMessage("")
        setError("Login Failed Please Check Your Credentials and login again");
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div className="container">
      <h3 className="heading"><u>Customer Login</u></h3>
      {message ? <h4 className="message">{message}</h4> : null}
      {error ? <h4 className="error">{error}</h4> : null}
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label className="label">Email</label>
          <input className="input" type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="inputContainer">
          <label className="label">Password</label>
          <input className="input" type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <p className="registerMessage">Don't have an account? <Link to="/registration">Register here</Link></p>
    </div>
  );
}
