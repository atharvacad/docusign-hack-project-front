import React, { useState, useRef } from 'react';
import axios from 'axios';
import './UploadDoc.css'; // Import the CSS file

const UploadDoc = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [agreementName, setAgreementName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    if (!pdfFile || !companyName || !agreementName || !contactName || !contactEmail) {
      alert('Please fill in all fields and select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('companyName', companyName);
    formData.append('agreementName', agreementName);
    formData.append('contactName', contactName);
    formData.append('contactEmail', contactEmail);

    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL); // Add this line to verify the URL

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/agreements`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('PDF uploaded successfully');
      // Clear all fields after successful upload
      setPdfFile(null);
      setCompanyName('');
      setAgreementName('');
      setContactName('');
      setContactEmail('');
      fileInputRef.current.value = ''; // Clear the file input
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
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div className="upload-doc-container">
      <h1 className="upload-doc-heading">Upload Document</h1>
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
        type="text"
        placeholder="Contact Name"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Contact Email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={inputStyle}
        ref={fileInputRef} // Attach the ref to the file input
      />
      <button onClick={handleSubmit} style={buttonStyle}>
        Upload PDF
      </button>
    </div>
  );
};

export default UploadDoc;