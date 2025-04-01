import React, { useState } from 'react';
import './FishStatsPanel.css';

function FishStatsPanel({ fish, onClose, onBack }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // TODO: Save the edited values
    setIsEditing(false);
  };

  const handleRemoveFish = () => {
    // This would remove the fish in a real implementation
    alert('Fish removal would be implemented in a future update!');
    onClose();
  };

  return (
    <div className="fish-stats-overlay">
      <div className="fish-stats-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="fish-stats-title">check fish</h2>
        
        <div className="fish-stats-content">
          <h3 className="fish-name">{fish.name}</h3>
          
          <div className="fish-image-container">
            <img 
              src={fish.image} 
              alt={fish.name} 
              className="fish-image" 
            />
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-label">Times completed</div>
              <div className="stat-value">10</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Best streak</div>
              <div className="stat-value">10</div>
            </div>
          </div>

          <div className="habit-details">
            {!isEditing ? (
              <>
                <div className="detail-row">
                  <span className="detail-label">frequency:</span>
                  <span className="detail-value">{fish.frequency || "Twice a week"}</span>
                  <button className="edit-button" onClick={handleEditClick}>
                    edit &gt;
                  </button>
                </div>
                <div className="detail-row">
                  <span className="detail-label">notifications:</span>
                  <span className="detail-value">{fish.notifications ? 'on' : 'off'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">goals:</span>
                  <span className="detail-value">{fish.goals || "be able to order food at a cafe"}</span>
                </div>
              </>
            ) : (
              <div className="edit-form">
                <div className="form-row">
                  <label>frequency:</label>
                  <input type="text" defaultValue={fish.frequency || "Twice a week"} />
                </div>
                <div className="form-row">
                  <label>notifications:</label>
                  <select defaultValue={fish.notifications ? 'on' : 'off'}>
                    <option value="on">on</option>
                    <option value="off">off</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>goals:</label>
                  <textarea defaultValue={fish.goals || "be able to order food at a cafe"} />
                </div>
                <button className="save-button" onClick={handleSaveEdit}>
                  save
                </button>
              </div>
            )}
          </div>

          <div className="heatmap-container">
            {/* Placeholder for heatmap */}
            <div className="heatmap-placeholder"></div>
          </div>

          <div className="button-container" style={{ justifyContent: 'center' }}>
            <button 
              className="remove-fish-button"
              onClick={handleRemoveFish}
            >
              remove fish
            </button>
          </div>

          <div className="button-container">
            <button className="back-button" onClick={onBack}>
              &lt; back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FishStatsPanel; 