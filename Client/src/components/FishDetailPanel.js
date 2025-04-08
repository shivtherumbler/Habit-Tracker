import React, { useState } from 'react';
import './FishDetailPanel.css';
import FishStatsPanel from './FishStatsPanel';
import apiClient from '../apiClient';

function FishDetailPanel({ fish, habitId, onBack, onClose }) {
  const [completedToday, setCompletedToday] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleFeedFish = async () => {
    try {
      // Fetch the latest habit details to ensure all fields are preserved
      const token = localStorage.getItem('token');
      const habitResponse = await apiClient(`/habits/${habitId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const latestHabit = habitResponse.data;
  
      // Increment progress
      const updatedProgress = (latestHabit.progress || 0) + 1;
      const isHabitComplete = updatedProgress >= latestHabit.frequency;
  
      // Prepare updated habit details
      const updatedHabit = {
        ...latestHabit,
        progress: updatedProgress,
        status: updatedProgress >= latestHabit.frequency ? 'full' : 'hungry',
        lastCompleted: new Date().toISOString(), // Save in ISO format for backend
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
  
      // Update the local state with the response data
      Object.assign(fish, response.data); // Update the fish object with the latest data
  
      // Mark as completed today
      const today = new Date().toLocaleDateString('en-US');
      const lastCompletedDate = new Date(updatedHabit.lastCompleted).toLocaleDateString('en-US');
      setCompletedToday(today === lastCompletedDate);
  
      alert(
        isHabitComplete
          ? 'Habit completed! Great job!'
          : `Fish fed! Progress: ${Math.min(
              (updatedProgress / latestHabit.frequency) * 100,
              100
            ).toFixed(0)}%`
      );
    } catch (err) {
      console.error('Error feeding fish:', err);
      alert('Failed to feed fish. Please try again.');
    }
  };

  const refetchHabitDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient(`/habits/${habitId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      Object.assign(fish, response.data); // Update the fish object with the latest data
  
      // Check if the habit was completed today
      const today = new Date().toLocaleDateString('en-US');
      const lastCompletedDate = new Date(fish.lastCompleted).toLocaleDateString('en-US');
      setCompletedToday(today === lastCompletedDate);
    } catch (err) {
      console.error('Error refetching habit details:', err);
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
        fish={fish}
        habitId={habitId}
        onClose={onClose}
        onBack={handleCloseStats}
      />
    );
  }

  return (
    <div className="check-fish-overlay">
      <div className="check-fish-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
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
            <span
              className={`fish-detail-value ${
                fish.progress >= fish.frequency ? 'full' : 'hungry'
              }`}
            >
              {fish.progress >= fish.frequency ? 'full' : 'hungry'}
            </span>
          </div>

            <div className="fish-detail-row">
              <span className="fish-detail-label">Last Completed:</span>
              <span className="fish-detail-value">
                {fish.lastCompleted
                  ? new Date(fish.lastCompleted).toLocaleDateString('en-US', {
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
                {fish.progress && fish.frequency
                  ? `${Math.min((fish.progress / fish.frequency) * 100, 100).toFixed(0)}%`
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
              disabled={completedToday || fish.isHungry}
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
            <button className="back-button" onClick={onBack}>
              &lt; back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FishDetailPanel;