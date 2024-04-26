import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pets(PreOwned)', 
    company: '',
    price: '',
    quantity: '',
    description: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch customer email from local storage
    const customerString = localStorage.getItem('customer');
    if (customerString) {
      const customer = JSON.parse(customerString);
      const customerEmail = customer.email;
      setFormData(prevState => ({ ...prevState, company: customerEmail }));
    }
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/addproduct`, formData);
      if (response.status === 200) {
        setFormData({
          name: '',
          category: 'Pets(PreOwned)',
          company: '',
          price: '',
          quantity: '',
          description: ''
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
    <div style={styles.container}>
      <h3 style={styles.title}><u>Add Product</u></h3>
      {
        message ? <h4 style={styles.message}>{message}</h4> : <h4 style={styles.error}>{error}</h4>
      }

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name:</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <select id="category" value={formData.category} onChange={handleChange} required style={styles.input}>
            <option value="Pets(PreOwned)">PreOwned Pets</option>
          </select>   
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Seller:</label>
          <input type="text" id="company" value={formData.company} onChange={handleChange} required style={styles.input} disabled />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input type="number" id="price" value={formData.price} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity:</label>
          <input type="number" id="quantity" value={formData.quantity} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea type="text" id="description" value={formData.description} onChange={handleChange} required style={styles.textarea} />
        </div>
        <button type="submit" style={styles.button}>Add</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '50%',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    borderRadius: '10px'
  },
  title: {
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formGroup: {
    margin: '10px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  label: {
    marginBottom: '5px',
    fontSize: '1.2rem'
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  textarea: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minHeight: '100px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  message: {
    color: 'green'
  },
  error: {
    color: 'red'
  }
};
