import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ViewRetailers() {
  const [retailers, setRetailers] = useState([]);

  const fetchRetailers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewretailers`);
      setRetailers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchRetailers();
  }, []);

  const deleteRetailer = async (username) => {
    try {
      await axios.delete(`${config.url}/deleteretailer/${username}`);
      fetchRetailers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Retailers</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Shop</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(retailers) && retailers.length > 0 ? (
    retailers.map((retailer, index) => (
      <tr key={index}>
        <td>{retailer.fullname}</td>
        <td>{retailer.gender}</td>
        <td>{retailer.dateofbirth}</td>
        <td>{retailer.company}</td>
        <td>{retailer.username}</td>
        <td>{retailer.email}</td>
        <td>{retailer.address}</td>
        <td>{retailer.contact}</td>
        <td>
          <button onClick={() => deleteRetailer(retailer.username)} className='button'>Remove</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}
