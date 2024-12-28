import React, { useState, useEffect } from 'react';

const HelloWorld = () => {
  const [fontSize, setFontSize] = useState('8vw');
  const [zoom, setZoom] = useState(1);

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
    setZoom((prevZoom) =>
      event.deltaY > 0
        ? Math.max(0.5, prevZoom - 0.1) // Zoom out
        : Math.min(2, prevZoom + 0.1) // Zoom in
    );
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

  return (
    <div style={containerStyle} onWheel={handleWheel}>
      <span style={textStyle}>Hello World</span>
    </div>
  );
};

export default HelloWorld;