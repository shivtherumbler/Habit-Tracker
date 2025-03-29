import React, { useState } from 'react';
import './SettingsPanel.css';

function SettingsPanel({ onClose }) {
  const [volume, setVolume] = useState(50);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
  };

  const handleChangePassword = () => {
    // Placeholder for future implementation
    alert('Change password functionality will be implemented with backend integration');
  };

  const handleLogout = () => {
    // Placeholder for future implementation
    alert('Logout functionality will be implemented with backend integration');
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
              className="settings-action-button blue-button" 
              onClick={handleChangePassword}
            >
              Change password
            </button>
            
            <button 
              className="settings-action-button" 
              onClick={handleLogout}
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