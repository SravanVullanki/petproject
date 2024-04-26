import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../main/login.css'; 
import config from '../config'

export default function RetailerLogin({onRetailerLogin}) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${config.url}/checkretailerlogin', formData);
      if (response.data != null) {
        onRetailerLogin();

        localStorage.setItem('retailer', JSON.stringify(response.data));

        navigate("/retailerhome");
      } else {
        setMessage("")
        setError("Login Failed Please Check Your Credentials and login again")
      }
    } catch (error) {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div className="container">
      <h3 className="heading"><u>Retailer Login</u></h3>
      {message ? <h4 className="message">{message}</h4> : null}
      {error ? <h4 className="error">{error}</h4> : null}
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label className="label">Username</label>
          <input className="input" type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="inputContainer">
          <label className="label">Password</label>
          <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <p className="registerMessage">Don't have an account? <Link to="/retailerapplicantregistration">Register here</Link></p>
    </div>
  );
}
