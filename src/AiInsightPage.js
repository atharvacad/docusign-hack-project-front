import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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
    <ul>
      {milestones.map((milestone, index) => (
        <li key={index}>{milestone}</li>
      ))}
    </ul>
  );

  const renderAreasOfConcern = (areasOfConcern) => (
    <table border="1">
      <thead>
        <tr>
          <th>Area</th>
          <th>Milestone</th>
          <th>Issue</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(areasOfConcern).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{areasOfConcern[key].milestone}</td>
            <td>{areasOfConcern[key].issue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderRecommendations = (recommendations) => (
    <table border="1">
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
    <div>
      <h1>AI Insight</h1>
      {aiInsight ? (
        <div>
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

          <h2>Strengths</h2>
          <h3>Early Completion</h3>
          {renderMilestones(aiInsight.strengths.early_completion)}
          <h3>Proactive Audit Preparation</h3>
          <p>{aiInsight.strengths.proactive_audit_preparation}</p>

          <h2>Recommendations</h2>
          {renderRecommendations(aiInsight.recommendations)}

          <h2>Q&A</h2>
          <form onSubmit={handleQuestionSubmit}>
            <label>
              Ask a question:
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {answer && (
            <div>
              <h3>Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AiInsightPage;