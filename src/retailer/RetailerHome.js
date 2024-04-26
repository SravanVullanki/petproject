import React, { useEffect, useState } from 'react';

export default function RetailerHome() {
  const [retailerData, setRetailerData] = useState("");

  useEffect(() => {
    const storedRetailerData = localStorage.getItem('retailer');
    if (storedRetailerData) {
      const parsedRetailerData = JSON.parse(storedRetailerData);
      setRetailerData(parsedRetailerData)
    }
  }, []);

  return (
    <div>
      {retailerData && (
        <div>
          <h4>Welcome {retailerData.fullname}</h4>
        </div>
      )}
    </div>
  );
}
