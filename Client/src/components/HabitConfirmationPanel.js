import React, { useState } from 'react';
import axios from 'axios';
import './HabitConfirmationPanel.css';

function HabitConfirmationPanel({ onClose, onBack, onComplete, habitDetails }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBackClick = () => {
    if (onBack) onBack();
  };
  const handleAddToAquarium = async () => {
    console.log('Habit details being sent to backend:', habitDetails); // Log the data

    try {
      setLoading(true);
      setError(null);

      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Send habit details to the backend with the Authorization header
      const response = await axios.post('http://localhost:5000/habits', habitDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      console.log('Habit added:', response.data);

      if (onComplete) onComplete(habitDetails);
    } catch (err) {
      console.error('Error adding habit:', err);
      setError('Failed to add habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="habit-confirmation-overlay">
      <div className="habit-confirmation-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="habit-confirmation-title">add fish</h2>

        <div className="habit-confirmation-content">
          <h3 className="habit-confirmation-heading">Adding this fish to your aquarium!</h3>

          <div className="selected-fish-container">
            <img
              src={habitDetails.fish.image}
              alt={habitDetails.fish.name}
              className="selected-fish-image"
            />
          </div>

          <div className="habit-details-summary">
            <h4 className="habit-name">{habitDetails.habitName}</h4>

            <div className="habit-detail-row">
              <span className="habit-detail-label">frequency:</span>
              <span className="habit-detail-value">{habitDetails.frequency}</span>
            </div>

            <div className="habit-detail-row">
              <span className="habit-detail-label">notifications:</span>
              <span className="habit-detail-value">{habitDetails.notifications}</span>
            </div>

            <div className="habit-detail-row">
              <span className="habit-detail-label">goals:</span>
              <span className="habit-detail-value">{habitDetails.goals}</span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          {loading && <p className="loading-message">Adding habit...</p>}

          <div className="button-container">
            <button className="back-button" onClick={handleBackClick}>
              &lt; back
            </button>
            <button
              className="confirm-button"
              onClick={handleAddToAquarium}
              disabled={loading}
            >
              add this fish to aquarium! &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitConfirmationPanel; 