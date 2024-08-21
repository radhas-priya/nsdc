import React, { createContext, useState } from 'react';

// Create Context
export const CertificateContext = createContext();

// Create Provider Component
export const CertificateProvider = ({ children }) => {
  const [certificateData, setCertificateData] = useState({});

  const updateCertificateData = (newData) => {
    setCertificateData(prevState => ({
      ...prevState,
      ...newData
    }));
  };

  return (
    <CertificateContext.Provider value={{ certificateData, updateCertificateData }}>
      {children}
    </CertificateContext.Provider>
  );
};
