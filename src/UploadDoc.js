import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './UploadDoc.css'; // Import the CSS file

const UploadDoc = () => {
  const location = useLocation();
  const { companyName: initialCompanyName, agreementName: initialAgreementName, contactName: initialContactName, contactEmail: initialContactEmail } = location.state || {};

  const [pdfFile, setPdfFile] = useState(null);
  const [companyName, setCompanyName] = useState(initialCompanyName || '');
  const [agreementName, setAgreementName] = useState(initialAgreementName || '');
  const [contactName, setContactName] = useState(initialContactName || '');
  const [contactEmail, setContactEmail] = useState(initialContactEmail || '');
  const [fileName, setFileName] = useState(''); // State to store the file name
  const fileInputRef = useRef(null); // Create a ref for the file input

  useEffect(() => {
    if (location.state) {
      setCompanyName(initialCompanyName);
      setAgreementName(initialAgreementName);
      setContactName(initialContactName);
      setContactEmail(initialContactEmail);
    }
  }, [location.state, initialCompanyName, initialAgreementName, initialContactName, initialContactEmail]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setFileName(file ? file.name : ''); // Update the file name state
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
      setFileName(''); // Clear the file name
      fileInputRef.current.value = ''; // Clear the file input
    } catch (error) {
      console.error('Error uploading PDF:', error); // Add this line to log the error
      alert('Error uploading PDF');
    }
  };

  return (
    <div className="upload-doc-container">
      <h1 className="upload-doc-heading">Upload Document</h1>
      <div className="inp">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder=" "
        />
        <label className="label">Company Name</label>
        <div className="focus-bg"></div>
      </div>
      <div className="inp">
        <input
          type="text"
          value={agreementName}
          onChange={(e) => setAgreementName(e.target.value)}
          placeholder=" "
        />
        <label className="label">Agreement Name</label>
        <div className="focus-bg"></div>
      </div>
      <div className="inp">
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder=" "
        />
        <label className="label">Contact Name</label>
        <div className="focus-bg"></div>
      </div>
      <div className="inp">
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder=" "
        />
        <label className="label">Contact Email</label>
        <div className="focus-bg"></div>
      </div>
      <div className="inp">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          placeholder=" "
          ref={fileInputRef} // Attach the ref to the file input
        />
        <div className="focus-bg"></div>
      </div>
      <button onClick={handleSubmit}>
        Upload PDF
      </button>
    </div>
  );
};

export default UploadDoc;