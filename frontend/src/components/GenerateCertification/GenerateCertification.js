import React, { useState} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import "./GenerateCertification.css";

const GenerateCertification = () => {
  const [certificateDetails, setCertificateDetails] = useState({
    username: '',
    batchId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateDetails({
      ...certificateDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/generate-certificate`, certificateDetails);
      
      if (response.status === 200) {
        toast.success('Batch created successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error details:', error); // Detailed error logging
      toast.error(error.response?.data?.message || 'Failed to create batch. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="background-gc">
        <div className='gc-form-container'>
          <div className="color-box-gc">
            <div className="h1-box-gc">
              <h3 className="h3-box-gc">Generate Certification</h3>
              <form className='form-gc' onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={certificateDetails.username}
                  onChange={handleChange}
                  required
                />

                <label>Batch ID</label>
                <input
                  type="text"
                  name="batchId"
                  placeholder="Enter Batch ID"
                  value={certificateDetails.batchId}
                  onChange={handleChange}
                  required
                />

                <button type="submit">Generate Certificate</button>
                <Link to='/download-certificate'>
                  <button className='download-certificate'>
                    Download Certificate
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default GenerateCertification;
