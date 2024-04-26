import React, { useEffect, useState } from 'react';
import config from '../config'

export default function CustomerHome() {
  const [customerData, setCustomerData] = useState("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  return (
    <div>
      {customerData && (
        <div>
          <h4>Welcome {customerData.fullname}</h4>
        </div>
      )}
    </div>
  );
}