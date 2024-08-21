import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreateBatch.css";
import { CertificateContext } from '../Context/certificateContext';

const CreateBatch = () => {
  const { updateCertificateData } = useContext(CertificateContext);
  const [batchDetails, setBatchDetails] = useState({
    batchName: '',
    batchSize: '',
    batchType: '',
    startDate: '',
    endDate: '',
    courseName: '',
    courseId: '',
    trainingHours: '',
    startTime: '',
    endTime: '',
    fees: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchDetails({
      ...batchDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create-batch`, batchDetails);

      if (response.status === 200) {
        toast.success('Batch created successfully!', {
          position: "top-right",
          autoClose: 3000,
        });

        updateCertificateData({
          batchName: batchDetails.batchName,
          courseId: batchDetails.courseId,
          startDate: batchDetails.startDate,
          endDate: batchDetails.endDate,
          percentage: '', 
          state: '', 
          country: '', 
          grade: ''
        });

        setBatchDetails({
          batchName: '',
          batchSize: '',
          batchType: '',
          startDate: '',
          endDate: '',
          courseName: '',
          courseId: '',
          trainingHours: '',
          startTime: '',
          endTime: '',
          fees: ''
        });
      }
    } catch (error) {
      console.error('Error details:', error);
      toast.error(error.response?.data?.message || 'Failed to create batch. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className='background-create-batch'>
        <div className='create-batch-out'>
          <div className="color-box-createBatch">
            <div className="h1-box-cr">
              <h3 className="h3-box-cr">Create New Batch</h3>
              <form className='form-cb' onSubmit={handleSubmit}>
                <label>Batch Name</label>
                <input 
                  type="text" 
                  name="batchName" 
                  placeholder="Enter Batch Name" 
                  value={batchDetails.batchName} 
                  onChange={handleChange} 
                  required
                />

                <label>Batch Size</label>
                <input 
                  type="number" 
                  name="batchSize" 
                  placeholder="Enter Batch Size" 
                  value={batchDetails.batchSize} 
                  onChange={handleChange} 
                  required
                />

                <label>Batch Type</label>
                <select 
                  name="batchType" 
                  value={batchDetails.batchType} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Batch Type</option>
                  <option value="regular">Regular</option>
                  <option value="weekend">Weekend</option>
                </select>

                <label>Batch Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={batchDetails.startDate} 
                  onChange={handleChange} 
                  required
                />

                <label>Batch End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={batchDetails.endDate} 
                  onChange={handleChange} 
                  required
                />

                <label>Course Name</label>
                <input 
                  type="text" 
                  name="courseName" 
                  placeholder="Enter Course Name" 
                  value={batchDetails.courseName} 
                  onChange={handleChange} 
                  required
                />

                <label>Course ID</label>
                <input 
                  type="text" 
                  name="courseId" 
                  placeholder="Enter Course ID" 
                  value={batchDetails.courseId} 
                  onChange={handleChange} 
                  required
                />

                <label>Training Per Day (Hours)</label>
                <input 
                  type="number" 
                  name="trainingHours" 
                  placeholder="Enter Training Hours" 
                  value={batchDetails.trainingHours} 
                  onChange={handleChange} 
                  required
                />

                <label>Start Time</label>
                <input 
                  type="time" 
                  name="startTime" 
                  value={batchDetails.startTime} 
                  onChange={handleChange} 
                  required
                />

                <label>End Time</label>
                <input 
                  type="time" 
                  name="endTime" 
                  value={batchDetails.endTime} 
                  onChange={handleChange} 
                  required
                />

                <label>Fees</label>
                <input 
                  type="number" 
                  name="fees" 
                  placeholder="Enter Fees Amount" 
                  value={batchDetails.fees} 
                  onChange={handleChange} 
                  required
                />

                <button type="submit">Create Batch</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateBatch;
