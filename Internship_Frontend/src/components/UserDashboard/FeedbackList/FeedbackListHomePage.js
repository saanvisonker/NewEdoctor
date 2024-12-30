import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedbackListHomePage.css';

const FeedbackListHomePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({}); // To keep track of likes for each feedback

  useEffect(() => {
    // Fetch all feedbacks when the component mounts
    axios
      .get("http://localhost:8080/feedback/get-all-feedbacks")
      .then((response) => {
        setFeedbacks(response.data || []);
      })
      .catch((error) => {
        setError("Failed to fetch feedbacks.");
      });
  }, []);

  // Handle like button click
  const handleLikeClick = (feedbackId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [feedbackId]: (prevLikes[feedbackId] || 0) + 1, // Increment the like count
    }));
  };

  return (
    <div className="feedback-list-container">
      {/* Header Section */}
      <div className="feedback-header">
        
        <p>Here you can see all the feedback provided by users</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Feedback Cards */}
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div className="feedback-item" key={index}>
              <div className="feedback-item-header">
                <p><strong>Doctor:</strong> {feedback.doctorEmail}</p>
                <p><strong>Rating:</strong> {feedback.rating}</p>
              </div>
              <div className="feedback-comment">
                <p><strong>Comment:</strong></p>
                <p>{feedback.comment}</p>
              </div>
              <div className="feedback-footer">
                <button 
                  className="like-button" 
                  onClick={() => handleLikeClick(feedback.id)}>
                    Like ({likes[feedback.id] || 0})
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackListHomePage;
