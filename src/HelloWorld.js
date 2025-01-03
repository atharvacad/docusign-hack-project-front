import React, { useState, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set the worker source
GlobalWorkerOptions.workerSrc = pdfjsWorker;

const HelloWorld = () => {
  const [fontSize, setFontSize] = useState('8vw');
  const [zoom, setZoom] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [agreementName, setAgreementName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState(''); // State for PDF text content

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

  const handlePdfChange = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file); // Set the selected PDF file in state

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await getDocument({ data: typedArray }).promise;
        const numPages = pdf.numPages;
        let textContent = '';

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const textItems = content.items;
          textContent += textItems.map(item => item.str).join(' ') + '\n';
        }

        setPdfText(textContent); // Set the extracted text content
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = () => {
    console.log('Company Name:', companyName);
    console.log('Agreement Name:', agreementName);
    console.log('Uploaded File:', pdfFile ? pdfFile.name : 'No file uploaded');
    alert('Form submitted successfully!');
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

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
    alignItems: 'center',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle} onWheel={handleWheel}>
      <span style={textStyle}>Hello World</span>
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter Agreement Name"
          value={agreementName}
          onChange={(e) => setAgreementName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfChange}
          style={inputStyle}
        />
        {pdfFile && <p>Uploaded File: {pdfFile.name}</p>}
        <textarea
          value={pdfText}
          readOnly
          rows={10}
          style={{ ...inputStyle, height: '200px', resize: 'none' }}
          placeholder="PDF content will be displayed here..."
        />
        <button style={buttonStyle} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default HelloWorld; 