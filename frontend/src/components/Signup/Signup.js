import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, signupData);
      
      if (response.status === 201) {
        toast.success('Batch created successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
        // Additional logic like redirecting the user can be added here
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
    <div className="background-signup">
      <div className='signup-form-container'>
        <div className="color-box-signup">
          <h3 className="h3-box-signup">Sign Up</h3>
          <form className='form-signup' onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={signupData.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signupData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={signupData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>
          <div className="signup-footer">
            <p>Already signed up? <Link to="/login" className="login-link">Login</Link></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
