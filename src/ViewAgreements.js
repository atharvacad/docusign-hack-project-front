import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewAgreements = () => {
  const [agreements, setAgreements] = useState([]);
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

  const renderTable = (data) => {
    const keys = Object.keys(data[0]);
    return (
      <table border="1">
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
    <div>
      <h1>All Agreements</h1>
      <ul>
        {agreements.map((agreement) => (
          <li key={agreement._id}>
            <h2>{agreement.companyName}</h2>
            <p>{agreement.agreementName}</p>
            <ul>
              {agreement.versions.map((version) => (
                <li key={version._id}>
                  <p>Version: {version.versionNumber}</p>
                  <p>Upload Date: {new Date(version.uploadDate).toLocaleString()}</p>
                  <p>AI Output:</p>
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
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAgreements;