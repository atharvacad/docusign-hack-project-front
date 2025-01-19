import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HelloWorld.css'; // Import the CSS file

const HelloWorld = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Hello, World!</h1>
      </div>
      <div className="right-section">
        <button className="upload-button" onClick={handleUploadClick}>Start Now</button>
      </div>
    </div>
  );
};

export default HelloWorld;