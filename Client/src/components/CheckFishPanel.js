import React, { useState, useEffect } from 'react';
import './CheckFishPanel.css';
import FishDetailPanel from './FishDetailPanel';
import apiClient from '../apiClient';

function CheckFishPanel({ onClose, onAddFishClick }) {
  const [habits, setHabits] = useState([]); // Store habits fetched from the backend
  const [selectedFish, setSelectedFish] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch habits from the backend
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        console.log('Token being sent to backend:', token); // Debugging log

        const response = await apiClient('/habits', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        console.log('API response from /habits:', response.data); // Debugging log

        // Decode the token to extract the userId
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        const userId = decodedToken.userId;

        // Filter habits by the logged-in user's ID
        const userHabits = response.data.filter((habit) => habit.userId === userId);
        setHabits(userHabits); // Set the filtered habits data
      } catch (err) {
        console.error('Error fetching habits:', err);
        setError('Failed to load habits. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHabits(); // Ensure this is being called
  }, []);

  // Handle fish item click
  const handleFishClick = (habit) => {
    console.log('Selected habit:', habit); // Debug log
    setSelectedFish(habit); // Pass the entire habit object
  };

  // Return to fish list
  const handleBackToList = () => {
    setSelectedFish(null);
  };

  // No fish state
  const renderNoFishState = () => (
    <div className="no-fish-container">
      <p className="no-fish-message">No fish yet! Add some fish to start tracking your habits!</p>
      <div className="button-container">
        <button className="back-button" onClick={onClose}>
          &lt; back
        </button>
        <button className="check-fish-button add-fish-button" onClick={onAddFishClick}>
          add fish
        </button>
      </div>
    </div>
  );

  // Has fish state with fish list
  const renderFishListState = () => (
    <div className="fish-list-container">
      <h3 className="fish-list-title">Here are the fish that are currently in your aquarium</h3>

      <div className="fish-list">
        {habits.map((habit) => (
          <div
            key={habit._id} // Use the habit's unique ID from the database
            className="fish-list-item"
            onClick={() => handleFishClick(habit)}
          >
            <div className="fish-list-image-container">
              <img
                src={habit.fish?.image || '/images/fish/default-fish.png'} // Use the image path from the database or fallback to default
                alt={habit.fish?.name || 'Unnamed Fish'} // Fallback for missing fish name
                className="fish-list-image"
              />
            </div>
            <div className="fish-list-details">
              <h4 className="fish-list-name">{habit.fish?.name || 'Unnamed Fish'}</h4> {/* Fallback for missing fish name */}
              <p className="fish-list-date">Habit: {habit.habitName || 'Unnamed Habit'}</p>
              <p className="fish-list-date">
  Last completed: {habit.lastCompleted
    ? new Date(habit.lastCompleted).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A'}
</p>
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="back-button" onClick={onClose}>
          &lt; back
        </button>
        <button className="check-fish-button add-fish-button" onClick={onAddFishClick}>
          add fish
        </button>
      </div>
    </div>
  );

  // If a fish is selected, show its details
  if (selectedFish) {
    return (
      <FishDetailPanel
        fish={selectedFish.fish} // Pass the fish object (including image)
        habitId={selectedFish._id} // Pass the habit ID
        onBack={handleBackToList}
        onClose={onClose}
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

        <div className="check-fish-content">
          {loading ? (
            <p>Loading habits...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : habits.length === 0 ? (
            renderNoFishState()
          ) : (
            renderFishListState()
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckFishPanel;