import React, { useEffect, useState } from 'react';
import './retailer.css';


export default function RetailerProfile() {
  const [retailerData, setRetailerData] = useState(null);

  useEffect(() => {
    const storedRetailerData = localStorage.getItem('retailer');
    if (storedRetailerData) {
      const parsedRetailerData = JSON.parse(storedRetailerData);
      setRetailerData(parsedRetailerData);
    }
  }, []);

  return (
    retailerData ? (
      <div className='profile-card'>
        <p><strong>Full Name:</strong> {retailerData.fullname}</p>
        <p><strong>Gender:</strong> {retailerData.gender}</p>
        <p><strong>Date of Birth:</strong> {retailerData.dateofbirth}</p>
        <p><strong>Shop:</strong> {retailerData.company}</p>
        <p><strong>Email:</strong> {retailerData.email}</p>
        <p><strong>Address:</strong> {retailerData.address}</p>
        <p><strong>Contact:</strong> {retailerData.contact}</p>
      </div>
    ) : (
      <p>No Recruiter Data Found</p>
    )
  );
}
