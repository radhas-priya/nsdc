import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CertificateProvider} from "./components/Context/certificateContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CertificateProvider>
    <App />
    </CertificateProvider>
  
);


