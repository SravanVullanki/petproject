import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import config from '../config'

export default function ViewRetailerApplicants() {
  const [retailerApplicants, setRetailerApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState('');

  useEffect(() => {
    fetchRetailerApplicants();
  }, []);

  const fetchRetailerApplicants = async () => {
    try {
      const response = await axios.get(`${config.url}/viewretailerapplicants`);
      setRetailerApplicants(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeStatus = async (applicantEmail, status) => {
    try {
      if (status === 'rejected' && !rejectionMessage.trim()) {
        alert('Please provide a rejection message.');
        return;
      }

      const requestData = {
        email: applicantEmail,
        status: status,
        rejectionMessage: status === 'rejected' ? rejectionMessage : ''
      };

      await axios.post(`${config.url}/changeretailerstatus`, requestData);
      // Refresh retailer applicants after status change
      fetchRetailerApplicants();
      setRejectionMessage(''); // Clear rejection message after submission
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (retailerApplicants.length === 0) {
    return <div>No retailer applicants found</div>;
  }

  return (
    <div className="table-container">
      <h3>Retailer Applicants</h3>
      <table className="retailer-applicant-table mx-auto" align="center">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Company</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {retailerApplicants.map(applicant => (
            <tr key={applicant._id}>
              <td>{applicant.fullname}</td>
              <td>{applicant.gender}</td>
              <td>{applicant.dateofbirth}</td>
              <td>{applicant.company}</td>
              <td>{applicant.username}</td>
              <td>{applicant.email}</td>
              <td>{applicant.address}</td>
              <td>{applicant.contact}</td>
              <td>{applicant.status}</td>
              <td>
                {applicant.status === 'applied' && (
                  <>
                    <button onClick={() => handleChangeStatus(applicant.email, 'accepted')}>Accept</button>
                    <button onClick={() => handleChangeStatus(applicant.email, 'rejected')}>Reject</button>
                    <input
                      type="text"
                      value={rejectionMessage}
                      placeholder="Enter rejection message"
                      onChange={e => setRejectionMessage(e.target.value)}
                    />
                  </>
                )}
                {applicant.status === 'rejected' && 'Rejected'}
                {applicant.status === 'accepted' && 'Accepted'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
