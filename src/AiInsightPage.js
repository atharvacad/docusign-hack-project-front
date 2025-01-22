import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './AiInsightPage.css'; // Import the CSS file

const AiInsightPage = () => {
  const location = useLocation();
  const { companyName, agreementName, versionNumber } = location.state;
  const [aiInsight, setAiInsight] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchAiInsight = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ai-insight-agreement`, {
          companyName,
          agreementName,
          versionNumber,
        });
        const parsedData = JSON.parse(response.data); // Parse the JSON string
        setAiInsight(parsedData);
      } catch (error) {
        console.error('Error fetching AI insight:', error);
      }
    };

    fetchAiInsight();

    const timer = setTimeout(() => {
      fetchAiInsight();
    }, 6000); // Auto-refresh after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount

  }, [companyName, agreementName, versionNumber]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const initialResponse = JSON.stringify(aiInsight); // Convert aiInsight to string
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat-ai-insight-agreement`, {
        initialResponse,
        userQuestion: question,
      });
      setAnswer(response.data.response); // Set the response field to the answer state
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  const renderMilestones = (milestones) => (
    <ul className="milestones-list">
      {milestones.map((milestone, index) => (
        <li key={index} className="milestone-item">
          {milestone}
        </li>
      ))}
    </ul>
  );

  const renderAreasOfConcern = (areasOfConcern) => (
    <ul className="areas-of-concern-list">
      {Array.isArray(areasOfConcern) ? (
        areasOfConcern.map((area, index) => (
          <li key={index} className="area-of-concern-item">
            {area}
          </li>
        ))
      ) : (
        <li className="area-of-concern-item">No areas of concern</li>
      )}
    </ul>
  );

  const renderRecommendations = (recommendations) => (
    <table border="1" className="data-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {recommendations.map((recommendation, index) => (
          <tr key={index}>
            <td>{recommendation.action}</td>
            <td>{recommendation.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    
    <div className="ai-insight-page">
      <h1 className="center-text">AI Insight for {agreementName}</h1>
      {aiInsight ? (
        <div>
        <div className="agreement-details1">
          <h2>Comapny Name: {companyName}</h2>
          <h2>Agrement Name: {agreementName}</h2>
          <h2>Version Number: {versionNumber}</h2>
          </div>
          <div className="agreement-details">
          <h2>Overall Project Status</h2>
          <h3>Completed Milestones</h3>
          {renderMilestones(aiInsight.overall_project_status.completed_milestones)}
          <h3>Delayed Milestones</h3>
          {renderMilestones(aiInsight.overall_project_status.delayed_milestones)}
          <h3>At Risk Milestones</h3>
          {renderMilestones(aiInsight.overall_project_status.at_risk_milestones)}
          <h3>On Track Milestones</h3>
          {renderMilestones(aiInsight.overall_project_status.on_track_milestones)}
          <h3>Not Started Milestones</h3>
          {renderMilestones(aiInsight.overall_project_status.not_started_milestones)}

          <h2>Areas of Concern</h2>
          {renderAreasOfConcern(aiInsight.areas_of_concern)}

          <h2>Recommendations</h2>
          {renderRecommendations(aiInsight.recommendations)}
        </div>
        </div>
      ) : (
        <p>Loading AI Insight...</p>
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

export default AiInsightPage;