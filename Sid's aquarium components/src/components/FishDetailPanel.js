import React, { useState } from 'react';
import './FishDetailPanel.css';
import FishStatsPanel from './FishStatsPanel';

function FishDetailPanel({ fish, onBack, onClose }) {
  const [completedToday, setCompletedToday] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  // Handle feed fish button click
  const handleFeedFish = () => {
    // In real implementation, this would mark the habit as completed for today
    // and update the backend
    setCompletedToday(true);
    
    // For demo purposes only - would actually be handled by backend
    fish.isHungry = false;
    fish.status = 'full';
    fish.lastCompleted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Alert for demo purposes
    alert('Fish fed! Habit marked as completed for today.');
  };
  
  // Handle check stats button click
  const handleCheckStats = () => {
    setShowStats(true);
  };

  const handleCloseStats = () => {
    setShowStats(false);
  };
  
  if (showStats) {
    return (
      <FishStatsPanel 
        fish={fish}
        onClose={onClose}
        onBack={handleCloseStats}
      />
    );
  }
  
  return (
    <div className="check-fish-overlay">
      <div className="check-fish-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="check-fish-title">check fish</h2>
        
        <div className="fish-detail-content">
          <h3 className="fish-detail-name">{fish.name}</h3>
          
          <div className="fish-detail-image-container">
            <img 
              src={fish.image} 
              alt={fish.name} 
              className="fish-detail-image" 
            />
          </div>
          
          <div className="fish-detail-info">
            <div className="fish-detail-row">
              <span className="fish-detail-label">status:</span>
              <span className={`fish-detail-value ${fish.isHungry ? 'hungry' : 'full'}`}>
                {fish.status}
              </span>
            </div>
            
            <div className="fish-detail-row">
              <span className="fish-detail-label">last completed:</span>
              <span className="fish-detail-value">{fish.lastCompleted}</span>
            </div>
            
            {fish.goals && (
              <div className="fish-detail-row">
                <span className="fish-detail-label">goals:</span>
                <span className="fish-detail-value">{fish.goals}</span>
              </div>
            )}
            
            {completedToday && (
              <div className="completion-message">
                I completed this habit today!
              </div>
            )}
          </div>
          
          <div className="fish-detail-buttons">
            <button 
              className="fish-detail-button feed-button" 
              onClick={handleFeedFish}
              disabled={completedToday || !fish.isHungry}
            >
              feed fish
            </button>
            
            <button 
              className="fish-detail-button stats-button" 
              onClick={handleCheckStats}
            >
              check stats
            </button>
          </div>
          
          <div className="button-container">
            <button 
              className="back-button" 
              onClick={onBack}
            >
              &lt; back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FishDetailPanel; 