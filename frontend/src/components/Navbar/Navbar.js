import React from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";
// import Nav from '../Nav1/Nav';


const Navbar = () => {
  return (
    <>
    {/* <Nav></Nav> */}
    <div className='navbar-2'>
      <ul className='nav-ul'>
        <li className='nav-li'>
            <div className="navbar-cr">
            <Link to="/candidate-registration">
              Candidate Registration
              </Link>
              </div> 
         
        </li>
        <li className='nav-li'>
      
            <div className='navbar-cb'>
            <Link to="/create-Batch">
              Create Batch
              </Link>
              </div>
         
        </li>
        <li className='nav-li'>
        
            <div className='navbar-as'>
            <Link to="/assessment-submission">
              Assessment Submission
              </Link>
              </div>
        
        </li>
        <li className='nav-li'>
          
            <div className='navbar-gc'>
            <Link to="/generate-certification">
              Generate Certificate
              </Link>
              </div>
        </li>
        <li className='nav-li'>
         
            <div className='navbar-dc'>
            <Link to="/download-certification">
              Download Certificate
              </Link></div>
        </li>
      </ul>
      
    </div>

    </>

  );
};

export default Navbar;
