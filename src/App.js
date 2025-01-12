import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import UploadDoc from './UploadDoc';
import ViewAgreements from './ViewAgreements';
import AiInsightPage from './AiInsightPage'; // Import the AiInsightPage component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
      <Route path="/upload" element={<UploadDoc />} />
      <Route path="/ai-insight" element={<AiInsightPage />} /> {/* Add the new route */}
      <Route path="/view-agreements" element={<ViewAgreements />} />
    </Routes>
  );
};

export default App;