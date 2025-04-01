import React from 'react';
import './HabitConfirmationPanel.css';

function HabitConfirmationPanel({ onClose, onBack, onComplete, habitDetails }) {
  // Habit details should include: name, frequency, notifications, goals, fish

  const handleBackClick = () => {
    if (onBack) onBack();
  };

  const handleAddToAquarium = () => {
    if (onComplete) onComplete(habitDetails);
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
            <h4 className="habit-name">{habitDetails.name}</h4>
            
            <div className="habit-detail-row">
              <span className="habit-detail-label">frequency:</span>
              <span className="habit-detail-value">{habitDetails.frequency}</span>
            </div>
            
            <div className="habit-detail-row">
              <span className="habit-detail-label">notifications:</span>
              <span className="habit-detail-value">{habitDetails.notifications ? 'on' : 'off'}</span>
            </div>
            
            <div className="habit-detail-row">
              <span className="habit-detail-label">goals:</span>
              <span className="habit-detail-value">
                {habitDetails.goals && habitDetails.goals.length > 60 
                  ? `${habitDetails.goals.substring(0, 57)}...` 
                  : habitDetails.goals}
              </span>
            </div>
          </div>
          
          <div className="button-container">
            <button className="back-button" onClick={handleBackClick}>
              &lt; back
            </button>
            <button 
              className="confirm-button"
              onClick={handleAddToAquarium}
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