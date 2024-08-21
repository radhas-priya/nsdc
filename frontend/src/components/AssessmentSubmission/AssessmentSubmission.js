import React, { useState,useContext} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AssessmentSubmission.css";
import {CertificateContext} from "../Context/certificateContext"


const AssessmentSubmission = () => {
  const [assessmentDetails, setAssessmentDetails] = useState({
    batchId: '',
    candidateId: '',
    attendance: '',
    percentage: '',
    grade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessmentDetails({
      ...assessmentDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/submit-assessment`, assessmentDetails);
      
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
      <div className='background-assessment'>
        <div className='assessment-form-container'>
          <div className="color-box-assessment">
            <div className="h1-box-cr">
              <h3 className="h3-box-cr">Assessment Submission</h3>
              <form className='form-assessment' onSubmit={handleSubmit}>
                <label>Batch ID</label>
                <input
                  type="text"
                  name="batchId"
                  placeholder="Enter Batch ID"
                  value={assessmentDetails.batchId}
                  onChange={handleChange}
                  required
                />

                <label>Candidate ID</label>
                <input
                  type="text"
                  name="candidateId"
                  placeholder="Enter Candidate ID"
                  value={assessmentDetails.candidateId}
                  onChange={handleChange}
                  required
                />

                <label>Attendance</label>
                <input
                  type="number"
                  name="attendance"
                  placeholder="Enter Attendance"
                  value={assessmentDetails.attendance}
                  onChange={handleChange}
                  required
                />

                <label>Percentage</label>
                <input
                  type="number"
                  name="percentage"
                  step="0.01"
                  placeholder="Enter Percentage"
                  value={assessmentDetails.percentage}
                  onChange={handleChange}
                  required
                />

                <label>Grade</label>
                <input
                  type="text"
                  name="grade"
                  placeholder="Enter Grade"
                  value={assessmentDetails.grade}
                  onChange={handleChange}
                  required
                />
                
                <button type="submit">Submit Assessment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AssessmentSubmission;
