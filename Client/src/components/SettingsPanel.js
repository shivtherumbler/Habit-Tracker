import React from 'react';
import './SettingsPanel.css';

function SettingsPanel({ onClose, onLogout, onVolumeChange, onMusicToggle, volume, musicEnabled }) {
  // Handle volume slider change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    onVolumeChange(newVolume); // Notify parent component about volume change
  };

  // Handle music toggle
  const handleMusicToggle = () => {
    onMusicToggle(!musicEnabled); // Notify parent component about music toggle
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="settings-title">settings</h2>
        
        <div className="settings-content">
          <div className="settings-section">
            <div className="settings-row">
              <label className="settings-label">Music:</label>
              <div className="toggle-container">
                <input 
                  type="checkbox" 
                  id="music-toggle" 
                  className="toggle-input" 
                  checked={musicEnabled}
                  onChange={handleMusicToggle}
                />
                <label htmlFor="music-toggle" className="toggle-label"></label>
              </div>
            </div>
            
            <div className="settings-row">
              <label className="settings-label">Volume:</label>
              <div className="volume-control">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={handleVolumeChange} 
                  className="volume-slider"
                />
                <span className="volume-value">{volume}%</span>
              </div>
            </div>
          </div>
          
          <div className="settings-divider"></div>
          
          <div className="settings-section">
            
            <button 
              className="settings-action-button" 
              onClick={onLogout} 
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;