import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CandRegistration.css';

const CandRegistration = () => {
  const [formData, setFormData] = useState({
    namePrefix: '',
    firstName: '',
    gender: '',
    dob: '',
    fatherName: '',
    guardianName: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log form data to verify

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/candidate-registration`, formData);
      if (response.status === 200) {
        toast.success('Candidate registered successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          namePrefix: '',
          firstName: '',
          gender: '',
          dob: '',
          fatherName: '',
          guardianName: '',
          email: '',
          phoneNumber: '',
          countryCode: '',
        });
      }
    } catch (error) {
      console.error('Error details:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="background-candReg">
      <div className="box-candreg-out">
        <div className="color-box-candReg">
          <div className="h1-box-cr">
            <h3 className="h3-box-cr">Candidate Registration</h3>
            <form className="form-cr" onSubmit={handleSubmit}>
              <label htmlFor="namePrefix">Name Prefix:</label>
              <input
                type="text"
                name="namePrefix"
                value={formData.namePrefix}
                onChange={handleChange}
                placeholder="Mr./Mrs./Ms."
                required
              />

              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />

              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />

              <label htmlFor="fatherName">Father's Name:</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's Name"
                required
              />

              <label htmlFor="guardianName">Guardian's Name:</label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Guardian's Name"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />

              <label htmlFor="countryCode">Country Code:</label>
              <input
                type="text"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                placeholder="+1, +91, etc."
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CandRegistration;
