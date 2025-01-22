import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import UploadDoc from './UploadDoc';
import ViewAgreements from './ViewAgreements';
import AiInsightPage from './AiInsightPage';
import CompareAiInsightPage from './CompareAiInsightPage'; // Import the CompareAiInsightPage component
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component
import './App.css'; // Import the CSS file

const App = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} /> {/* Pass currentPage prop */}
      <div className="content">
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/upload" element={<UploadDoc />} />
          <Route path="/ai-insight" element={<AiInsightPage />} />
          <Route path="/view-agreements" element={<ViewAgreements />} />
          <Route path="/compare-ai-insight" element={<CompareAiInsightPage />} /> {/* Add the new route */}
        </Routes>
      </div>
      <Footer currentPage={currentPage} /> {/* Pass currentPage prop */}
    </div>
  );
};

export default App;