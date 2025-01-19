import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CompareAiInsight.css'; // Import the CSS file

const CompareAiInsightPage = () => {
  const location = useLocation();
  const { companyName, agreementName, versionNumberA, versionNumberB } = location.state;
  const [comparisonResult, setComparisonResult] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const initialResponse = JSON.stringify(comparisonResult); // Convert comparisonResult to string
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat-ai-insight-agreement`, {
        initialResponse,
        userQuestion: question,
      });
      setAnswer(response.data.response); // Set the response field to the answer state
    } catch (error) {
      console.error('Error getting answer:', error);
      console.error(error.response ? error.response.data : error.message); // Improved error logging
    }
  };

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
      <div className="comparison-details">
        <p><strong>Company Name:</strong> {companyName}</p>
        <p><strong>Agreement Name:</strong> {agreementName}</p>
        <p><strong>Version A:</strong> {versionNumberA}</p>
        <p><strong>Version B:</strong> {versionNumberB}</p>
      </div>
      {comparisonResult ? (
        renderComparisonTable(comparisonResult)
      ) : (
        <p>Loading...</p>
      )}
      <form onSubmit={handleQuestionSubmit}>
        <div className="inp">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this agreement"
            className="textarea" // Add a class for textarea
          />
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      {answer && (
         <div className="highlighted-answer1">
          <ul className="highlighted-answer">
          <h3>Answer:</h3>
          <p>{answer}</p>
         </ul>
       </div>
      )}
    </div>
  );
};

export default CompareAiInsightPage;