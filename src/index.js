import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UploadDoc from './UploadDoc';
import ViewAgreements from './ViewAgreements'; // Import the new component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<UploadDoc />} />
        <Route path="/view-agreements" element={<ViewAgreements />} /> {/* Add the new route */}
      </Routes>
    </Router>
  </React.StrictMode>
);