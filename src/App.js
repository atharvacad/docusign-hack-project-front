import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import UploadDoc from './UploadDoc';
import ViewAgreements from './ViewAgreements';
import AiInsightPage from './AiInsightPage';
import CompareAiInsightPage from './CompareAiInsightPage'; // Import the CompareAiInsightPage component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
      <Route path="/upload" element={<UploadDoc />} />
      <Route path="/ai-insight" element={<AiInsightPage />} />
      <Route path="/view-agreements" element={<ViewAgreements />} />
      <Route path="/compare-ai-insight" element={<CompareAiInsightPage />} /> {/* Add the new route */}
    </Routes>
  );
};

export default App;