import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import UploadDoc from './UploadDoc';

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<HelloWorld />} />
    <Route path="/UploadDoc" element={<UploadDoc />} />
  </Routes>
  );
};

export default App;