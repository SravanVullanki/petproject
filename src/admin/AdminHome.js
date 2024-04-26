import React, { useEffect, useState } from 'react';
export default function AdminHome() {
  const [adminData, setAdminData] = useState("");

  useEffect(() => {
    const storedAdminData = localStorage.getItem('admin');
    if (storedAdminData) {
      const parsedAdminData = JSON.parse(storedAdminData);
      setAdminData(parsedAdminData);
    }
  }, []);

  return (
    <div>
      {adminData && (
        <div>
          <h4>Welcome {adminData.username}</h4>
        </div>
      )}
    </div>
  );
}
