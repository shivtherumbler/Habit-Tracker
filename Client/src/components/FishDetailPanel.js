import React, { useState, useEffect } from 'react';
import './FishDetailPanel.css';
import FishStatsPanel from './FishStatsPanel';
import apiClient from '../apiClient';

function FishDetailPanel({ fish, habitId, onBack, onClose, onReload }) {
  const [completedToday, setCompletedToday] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [habitDetails, setHabitDetails] = useState(fish || {}); // Ensure habitDetails is initialized

  // Fetch the latest habit details when the panel is opened
  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient(`/habits/${habitId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHabitDetails(response.data || {}); // Update local habit details
        const today = new Date().toLocaleDateString('en-US');
        const lastCompletedDate = new Date(response.data.lastCompleted).toLocaleDateString('en-US');
        setCompletedToday(today === lastCompletedDate);
      } catch (err) {
        console.error('Error fetching habit details:', err);
      }
    };

    fetchHabitDetails();
  }, [habitId]);

  const handleFeedFish = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedProgress = (habitDetails.progress || 0) + 1;
      const isHabitComplete = updatedProgress >= habitDetails.frequency;
  
      const updatedHabit = {
        ...habitDetails,
        progress: updatedProgress,
        status: isHabitComplete ? 'full' : 'hungry',
        lastCompleted: new Date().toISOString(),
      };
  
      // Save the updated data to the backend
      const response = await apiClient(`/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: updatedHabit,
      });
  
      // Update the local state with the latest data
      setHabitDetails(response.data || {});
      const today = new Date().toLocaleDateString('en-US');
      const lastCompletedDate = new Date(response.data.lastCompleted).toLocaleDateString('en-US');
      setCompletedToday(today === lastCompletedDate);
  
      // Open the FishStatsPanel with updated data
      setShowStats(true);
    } catch (err) {
      console.error('Error feeding fish:', err);
      alert('Failed to feed fish. Please try again.');
    }
  };

  const handleCheckStats = () => {
    setShowStats(true);
  };

  const handleCloseStats = () => {
    setShowStats(false);
  };

  if (showStats) {
    return (
      <FishStatsPanel
        fish={habitDetails}
        habitId={habitId}
        onClose={onClose}
        onBack={handleCloseStats}
      />
    );
  }

  // Ensure fish and habitDetails are defined before rendering
  const fishImage = fish?.image || '/images/fish/default-fish.png';
  const fishName = habitDetails?.habitName || 'Unnamed Fish';

  return (
    <div className="check-fish-overlay">
      <div className="check-fish-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="check-fish-title">check fish</h2>

        <div className="fish-detail-content">
          <h3 className="fish-detail-name">{fishName}</h3>

          <div className="fish-detail-image-container">
            <img
              src={fishImage}
              alt={fishName}
              className="fish-detail-image"
            />
          </div>

          <div className="fish-detail-info">
            <div className="fish-detail-row">
              <span className="fish-detail-label">status:</span>
              <span
                className={`fish-detail-value ${
                  habitDetails.progress >= habitDetails.frequency ? 'full' : 'hungry'
                }`}
              >
                {habitDetails.progress >= habitDetails.frequency ? 'full' : 'hungry'}
              </span>
            </div>

            <div className="fish-detail-row">
              <span className="fish-detail-label">Last Completed:</span>
              <span className="fish-detail-value">
                {habitDetails.lastCompleted
                  ? new Date(habitDetails.lastCompleted).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </div>

            <div className="fish-detail-row">
              <span className="fish-detail-label">Progress:</span>
              <span className="fish-detail-value">
                {habitDetails.progress && habitDetails.frequency
                  ? `${Math.min(
                      (habitDetails.progress / habitDetails.frequency) * 100,
                      100
                    ).toFixed(0)}%`
                  : '0%'}
              </span>
            </div>

            {completedToday && (
              <div className="completion-message green-panel">
                You fed this fish already today!
              </div>
            )}
          </div>

          <div className="fish-detail-buttons">
            <button
              className="fish-detail-button feed-button"
              onClick={handleFeedFish}
              disabled={completedToday || habitDetails.progress >= habitDetails.frequency}
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
            onClick={() => {
              onBack();
              if (onReload) {
                onReload(); // Call the onReload function to fetch updated data
              }
            }}
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