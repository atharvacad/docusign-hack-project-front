import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={containerStyle}>
      <span>Hello World</span>
      <button style={buttonStyle} onClick={handleUploadClick}>Start</button>
      <button style={buttonStyle} onClick={handleViewAgreementsClick}>View All Agreements</button>
    </div>
  );
};

export default HelloWorld;