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
        <ul className="ul1">
          <img src="https://raw.githubusercontent.com/Marvin1198/BackgroubWallpapers/main/Brain.png" alt="Logo" className="logo-image" />
        </ul>
      </div>
      <div className="right-section">
        <ul className="ul1">
            <h1>Let the AI thinks for you !!!</h1>
            <button className="upload-button" onClick={handleUploadClick}>Start Now</button>
        </ul>
      </div>
    </div>
  );
};

export default HelloWorld;