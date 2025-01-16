import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CompareAiInsight.css'; // Import the CSS file

const CompareAiInsightPage = () => {
  const location = useLocation();
  const { companyName, agreementName, versionNumberA, versionNumberB } = location.state;
  const [comparisonResult, setComparisonResult] = useState(null);

  useEffect(() => {
    const compareAiInsight = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/compare-ai-insight-agreement`, {
          companyName,
          agreementName,
          versionNumberA,
          versionNumberB,
        });
        const parsedData = JSON.parse(response.data.comparison); // Parse the JSON string
        setComparisonResult(parsedData);
      } catch (error) {
        console.error('Error comparing AI insight:', error);
      }
    };

    compareAiInsight();
  }, [companyName, agreementName, versionNumberA, versionNumberB]);

  const renderComparisonTable = (data) => {
    return (
      <table border="1" className="comparison-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              <td>{key.replace(/_/g, ' ')}</td>
              <td>
                <ul>
                  {data[key].points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="compare-ai-insight-page">
      <h1 className="center-text">Compare AI Insight</h1>
      {comparisonResult ? (
        renderComparisonTable(comparisonResult)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CompareAiInsightPage;