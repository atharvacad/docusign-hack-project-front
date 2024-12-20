import React, { useState, useEffect } from 'react';

const HelloWorld = () => {
  // State to store the font size and zoom level
  const [fontSize, setFontSize] = useState('8vw');
  const [zoom, setZoom] = useState(1);

  // Update font size and background size based on window width and zoom level
  useEffect(() => {
    const updateStyles = () => {
      const width = window.innerWidth;
      const currentZoom = window.devicePixelRatio;

      // Dynamically adjust font size based on window width and zoom
      if (width <= 400) {
        setFontSize(`${12 * currentZoom}vw`);
      } else if (width <= 600) {
        setFontSize(`${8 * currentZoom}vw`);
      } else {
        setFontSize(`${5 * currentZoom}vw`);
      }
      setZoom(currentZoom);
    };

    // Set initial font size on mount
    updateStyles();

    // Add event listener to update font size and background size on window resize
    window.addEventListener('resize', updateStyles);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', updateStyles);
    };
  }, [zoom]);

  // Handle zooming with mouse scroll
  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      setZoom(prevZoom => Math.max(0.5, prevZoom - 0.1)); // Zoom out
    } else {
      setZoom(prevZoom => Math.min(2, prevZoom + 0.1)); // Zoom in
    }
  };

  // Container styles with dynamic background size based on zoom level
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
    background: `radial-gradient(circle, white 8%, skyblue ${15 * zoom}%,rgb(13, 0, 58) ${30 * zoom}%)`, // 3-layer gradient (white, light blue, dark blue)
    margin: 0, // Remove margin
    position: 'relative', // Relative positioning for the container
    transition: 'background-size 0.2s ease', // Smooth transition for background size change
  };

  const textStyle = {
    color: 'black', // Text color
    fontSize: fontSize, // Dynamic font size based on state
    position: 'absolute', // Position text absolutely to center it
    textAlign: 'center', // Center the text horizontally
    whiteSpace: 'nowrap', // Prevent text from wrapping
    transition: 'font-size 0.2s ease', // Smooth transition for resizing
  };

  return (
    <div style={containerStyle} onWheel={handleWheel}>
      <span style={textStyle}>Hello World</span>
    </div>
  );
};

export default HelloWorld;
