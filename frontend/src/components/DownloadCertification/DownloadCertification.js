import React, { useContext } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import certificate from "../../assets/academicCertificate.jpg";
import "./DownloadCertification.css";
import { CertificateContext } from '../Context/certificateContext';

const DownloadCertification = () => {
  const { certificateData } = useContext(CertificateContext);

  const downloadCertificate = () => {
    const element = document.getElementById('certificate');
    
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('certificate.pdf');
    });
  };

  const {
    namePrefix,
    firstName,
    batchId,
    batchName,
    courseId,
    state,
    country,
    percentage,
    grade,
    startDate,
    endDate
  } = certificateData;

  return (
    <div className='certificate-div'>
      <div className='certificate-img-div' id='certificate'>
        <img className='certificate-img' src={certificate} alt="certificate" />
        <div className='certification-div-2'>
          <h3 className="h3-certification-heading">
            Proudly presenting to {namePrefix} {firstName}, who successfully completed {courseId} from {startDate} to {endDate} with {percentage}. The student has been outstanding throughout the course.
          </h3>
          <div className='certificate-details'>
            <p>Batch ID: {batchId}</p>
            <p>Batch Name: {batchName}</p>
            <p>Course ID: {courseId}</p>
            <p>State: {state}</p>
            <p>Country: {country}</p>
            <p>Percentage: {percentage}</p>
            <p>Grade: {grade}</p>
          </div>
        </div>
      </div>
      <button onClick={downloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default DownloadCertification;
