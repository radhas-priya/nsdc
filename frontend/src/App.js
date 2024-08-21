import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import CandRegistration from './components/CandRegistration/CandRegistration';
import CreateBatch from './components/CreateBatch/CreateBatch';
import DownloadCertification from './components/DownloadCertification/DownloadCertification';
import GenerateCertification from './components/GenerateCertification/GenerateCertification';
import AssessmentSubmission from './components/AssessmentSubmission/AssessmentSubmission';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Nav from './components/Nav1/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/navbar" element={<Navbar/>}></Route>
         <Route path="/candidate-registration" element={<CandRegistration/>}></Route>
         <Route path="/create-batch" element={<CreateBatch/>}></Route>
         <Route path="/download-certification" element={<DownloadCertification/>}></Route>
         <Route path="/generate-certification" element={<GenerateCertification/>}></Route>
         <Route path="/assessment-submission" element={<AssessmentSubmission/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         
         <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
