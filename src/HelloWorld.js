import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HelloWorld.css'; // Import the CSS file

const HelloWorld = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '24px',
    transition: 'font-size 0.2s ease',
    position: 'relative',
    zIndex: 1,
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleViewAgreementsClick = () => {
    navigate('/view-agreements');
  };

  return (
    <div className="container" style={containerStyle}>
      <h1>Hello, World!</h1>
      <button style={buttonStyle} onClick={handleUploadClick}>Upload Document</button>
      <button style={buttonStyle} onClick={handleViewAgreementsClick}>View Agreements</button>
    </div>
  );
};

export default HelloWorld;