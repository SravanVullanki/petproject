import React, { useEffect, useState } from 'react';
import './style.css'

export default function CustomerProfile() {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  return (
    customerData ? (
      <div className='profile-card'>
        <p><strong>Full Name:</strong> {customerData.fullname}</p>
        <p><strong>Gender:</strong> {customerData.gender}</p>
        <p><strong>Date of Birth:</strong> {customerData.dateofbirth}</p>
        <p><strong>Email:</strong> {customerData.email}</p>
        <p><strong>Location:</strong> {customerData.location}</p>
        <p><strong>Contact:</strong> {customerData.contact}</p>
      </div>
    ) : (
      <p>No Job Seeker Data Found</p>
    )
  );
}
