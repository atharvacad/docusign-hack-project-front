import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './ViewAgreements.css'; // Import the CSS file

const ViewAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [esignatureResponse, setEsignatureResponse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgreements = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/all-agreements`;
      console.log('Fetching agreements from:', url); // Debugging statement

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAgreements(data);
      } catch (error) {
        console.error('Error fetching agreements:', error);
      }
    };

    fetchAgreements();
  }, []);

  const handleVersionSelect = (version) => {
    setSelectedVersions((prevSelectedVersions) => {
      if (prevSelectedVersions.some((v) => v._id === version._id)) {
        return prevSelectedVersions.filter((v) => v._id !== version._id);
      } else if (prevSelectedVersions.length < 2) {
        return [...prevSelectedVersions, version];
      } else {
        return prevSelectedVersions;
      }
    });
  };

  const handleCompareAiInsight = () => {
    if (selectedVersions.length === 2) {
      const [versionA, versionB] = selectedVersions;
      navigate('/compare-ai-insight', {
        state: {
          companyName: versionA.companyName,
          agreementName: versionA.agreementName,
          versionNumberA: versionA.versionNumber,
          versionNumberB: versionB.versionNumber,
        },
      });
    }
  };

  const handleEsignatureSubmit = async (version) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/esignature`, {
        companyName: version.companyName,
        agreementName: version.agreementName,
        versionNumber: version.versionNumber,
      });
      setEsignatureResponse(response.data.message + ' Envelope ID: ' + response.data.envelopeId);
      alert('eSignature Request sent successfully');
      setAgreements((prevAgreements) =>
        prevAgreements.map((agreement) =>
          agreement.versions.some((v) => v._id === version._id)
            ? {
                ...agreement,
                versions: agreement.versions.map((v) =>
                  v._id === version._id ? { ...v, esignSent: true } : v
                ),
              }
            : agreement
        )
      );
      setEsignatureResponse('');
    } catch (error) {
      console.error('Error sending eSignature:', error);
    }
  };

  const handleUploadUpdatedDocument = (version) => {
    navigate('/upload', {
      state: {
        companyName: version.companyName,
        agreementName: version.agreementName,
        contactName: version.contactName,
        contactEmail: version.contactEmail,
      },
    });
  };

  const renderTable = (data) => {
    const keys = Object.keys(data[0]);
    return (
      <table border="1" className="data-table">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>
                  {Array.isArray(item[key])
                    ? renderTable(item[key])
                    : typeof item[key] === 'object'
                    ? JSON.stringify(item[key])
                    : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleViewPdf = (pdfData) => {
    const blob = new Blob([new Uint8Array(pdfData)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleNavigateToAiInsight = (companyName, agreementName, versionNumber) => {
    navigate('/ai-insight', { state: { companyName, agreementName, versionNumber } });
  };

  return (
    <div className="view-agreements">
      <h1 className="center-text">All Agreements</h1>
      <ul className="agreements-list">
        {agreements.map((agreement) => (
          <li key={agreement._id} className="agreement-item">
            <h2>Company Name: {agreement.companyName}</h2>
            <p>Agreement Name: {agreement.agreementName}</p>
            <p>Contact Name: {agreement.contactName}</p>
            <p>Contact Email: {agreement.contactEmail}</p>
            <ul className="versions-list">
              {agreement.versions.map((version) => (
                <li
                  key={version._id}
                  className={`version-item ${selectedVersions.some((v) => v._id === version._id) ? 'selected-version' : ''}`}
                >
                  <p>Version: {version.versionNumber}</p>
                  <p>Upload Date: {new Date(version.uploadDate).toLocaleString()}</p>
                  <p>Milestone details:</p>
                  {version.aiOutput && renderTable(JSON.parse(version.aiOutput).milestones)}
                  <button onClick={() => handleViewPdf(version.fileData.data)}>
                    View PDF
                  </button>
                  <button
                    onClick={() =>
                      handleNavigateToAiInsight(agreement.companyName, agreement.agreementName, version.versionNumber)
                    }
                  >
                    AI Insight Page
                  </button>
                  <button onClick={() => handleVersionSelect({ ...version, companyName: agreement.companyName, agreementName: agreement.agreementName })}>
                    {selectedVersions.some((v) => v._id === version._id) ? 'Deselect' : 'Select'} Version
                  </button>
                  <button onClick={() => handleEsignatureSubmit({ ...version, companyName: agreement.companyName, agreementName: agreement.agreementName })}>
                    Submit for eSignature
                  </button>
                  <button onClick={() => handleUploadUpdatedDocument({ ...version, companyName: agreement.companyName, agreementName: agreement.agreementName, contactName: agreement.contactName, contactEmail: agreement.contactEmail })}>
                    Upload Updated Document
                  </button>
                  {version.esignSent && (
                    <p style={{ color: 'red' }}>eSignature request already sent</p>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleCompareAiInsight} disabled={selectedVersions.length !== 2}>
        Compare AI Insight
      </button>
      {selectedVersions.length !== 2 && (
        <p style={{ color: 'red' }}>Please select 2 versions</p>
      )}
      {esignatureResponse && (
        <div className="esignature-response">
          <h3>eSignature Response:</h3>
          <p>{esignatureResponse}</p>
        </div>
      )}
    </div>
  );
};

export default ViewAgreements;