import React, { useState } from 'react';
import axios from 'axios';

const UploadDoc = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [agreementName, setAgreementName] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [pageCount, setPageCount] = useState(0);

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    // Add logic to extract text and page count from the PDF file if needed
  };

  const handleSubmit = async () => {
    if (!pdfFile || !companyName || !agreementName) {
      alert('Please fill in all fields and select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('companyName', companyName);
    formData.append('agreementName', agreementName);

    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL); // Add this line to verify the URL

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/agreements`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPdfText(response.data.pdfText);
      alert('PDF uploaded successfully');
    } catch (error) {
      console.error('Error uploading PDF:', error); // Add this line to log the error
      alert('Error uploading PDF');
    }
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    margin: '10px 0',
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
    <div>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Agreement Name"
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
      <input
        type="text"
        value={`Page Count: ${pageCount}`}
        readOnly
        style={{ ...inputStyle, height: '40px', textAlign: 'center' }}
      />
      <button style={buttonStyle} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default UploadDoc;