import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAgreements.css'; // Import the CSS file

const ViewAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedVersions, setSelectedVersions] = useState([]);
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
    } else {
      alert('Please select exactly two versions to compare.');
    }
  };

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
                <li
                  key={version._id}
                  className={selectedVersions.some((v) => v._id === version._id) ? 'selected-version' : ''}
                >
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
                  <button onClick={() => handleVersionSelect({ ...version, companyName: agreement.companyName, agreementName: agreement.agreementName })}>
                    {selectedVersions.some((v) => v._id === version._id) ? 'Deselect' : 'Select'} Version
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleCompareAiInsight} disabled={selectedVersions.length !== 2}>
        Compare AI Insight
      </button>
    </div>
  );
};

export default ViewAgreements;