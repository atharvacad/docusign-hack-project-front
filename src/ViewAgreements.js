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
                  <p>AI Output: {version.aiOutput}</p>
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