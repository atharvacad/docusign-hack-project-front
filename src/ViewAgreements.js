import React, { useEffect, useState } from 'react';

const ViewAgreements = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/all-agreements');
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