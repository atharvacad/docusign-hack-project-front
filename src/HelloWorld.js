import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HelloWorld = () => {
  const [fontSize, setFontSize] = useState('8vw');
  const [zoom, setZoom] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const updateStyles = () => {
      const width = window.innerWidth;
      const currentZoom = window.devicePixelRatio;

      if (width <= 400) {
        setFontSize(`${12 * currentZoom}vw`);
      } else if (width <= 600) {
        setFontSize(`${8 * currentZoom}vw`);
      } else {
        setFontSize(`${5 * currentZoom}vw`);
      }
      setZoom(currentZoom);
    };

    updateStyles();
    window.addEventListener('resize', updateStyles);

    return () => window.removeEventListener('resize', updateStyles);
  }, []);

  const handleWheel = (event) => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom + event.deltaY * -0.01;
      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: `radial-gradient(circle, white 8%, skyblue ${15 * zoom}%, rgb(13, 0, 58) ${30 * zoom}%)`,
    margin: 0,
    transition: 'background-size 0.2s ease',
  };

  const textStyle = {
    color: 'whitesmoke',
    fontSize: fontSize,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    transition: 'font-size 0.2s ease',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const handleButtonClick = () => {
    navigate('/UploadDoc');
  };

  return (
    <div style={containerStyle} onWheel={handleWheel}>
      <span style={textStyle}>Hello World</span>
      <button style={buttonStyle} onClick={handleButtonClick}>Start</button>
    </div>
  );
};

export default HelloWorld;