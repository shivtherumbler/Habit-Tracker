import { useEffect, useState } from 'react';
import apiClient from '../apiClient'; // Axios client setup

import './FishStatsPanel.css';

function FishStatsPanel({ fish, habitId, onClose, onBack }) {
  const [habitDetails, setHabitDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const response = await apiClient.get(`/habits/${habitId}`);
        setHabitDetails(response.data);
      } catch (err) {
        console.error('Failed to fetch habit details:', err);
        setError('Failed to load habit details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchHabitDetails();
  }, [habitId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Example of saving edited values (to be implemented)
      const updatedDetails = {
        ...habitDetails,
        // Add logic to update fields here
      };
      await apiClient(`/habits/${habitId}`, {
        method: 'PUT',
        data: updatedDetails,
      });
      setHabitDetails(updatedDetails); // Update local state
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save habit details:', err);
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleRemoveFish = () => {
    alert('Fish removal would be implemented in a future update!');
    onClose();
  };

  const { habitName, frequency, notifications, goals, lastCompleted } = habitDetails;

  return (
    <div className="fish-stats-overlay">
      <div className="fish-stats-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="fish-stats-title">Fish Stats</h2>
        
        <div className="fish-stats-content">
          <h3 className="fish-name">{fish.name || 'Unnamed Fish'}</h3>
          
          <div className="fish-image-container">
            <img 
              src={fish.image || '/images/fish/default-fish.png'} 
              alt={fish.name || 'Unnamed Fish'} 
              className="fish-image" 
            />
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-label">Times Completed</div>
              <div className="stat-value">{fish.timesCompleted || '0'}</div>
            </div>
          </div>

          <div className="habit-details">
            {!isEditing ? (
              <>
                <div className="detail-row">
                  <button className="edit-button" onClick={handleEditClick}>
                      edit &gt;
                  </button>
                  <span className="detail-label">Habit Name:</span>
                  <span className="detail-value">{habitName || 'No habit name provided'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Frequency:</span>
                  <span className="detail-value">{frequency || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Notifications:</span>
                  <span className="detail-value">{notifications ? 'On' : 'Off'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Goals:</span>
                  <span className="detail-value">{goals || 'No goals set'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Completed:</span>
                  <span className="detail-value">{lastCompleted || 'N/A'}</span>
                </div>
              </>
            ) : (
              <div className="edit-form">
                <div className="form-row">
                  <label>Frequency:</label>
                  <input
                    type="text"
                    defaultValue={frequency || ''}
                    onChange={(e) => setHabitDetails({ ...habitDetails, frequency: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <label>Notifications:</label>
                  <select
                    defaultValue={notifications ? 'on' : 'off'}
                    onChange={(e) => setHabitDetails({ ...habitDetails, notifications: e.target.value === 'on' })}
                  >
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Goals:</label>
                  <textarea
                    defaultValue={goals || ''}
                    onChange={(e) => setHabitDetails({ ...habitDetails, goals: e.target.value })}
                  />
                </div>
                <button className="save-button" onClick={handleSaveEdit}>
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="button-container">
            <button className="remove-fish-button" onClick={handleRemoveFish}>
              Remove Fish
            </button>
            <button className="back-button" onClick={onBack}>
              &lt; Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FishStatsPanel;