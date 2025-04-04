import React, { useState } from 'react';
import './CheckFishPanel.css';
import FishDetailPanel from './FishDetailPanel';
// Import sample fish images to use as placeholders
import blueTang from '../images/fish/blue-tang.png';
import clownFish from '../images/fish/clown-fish.png';
import guppy from '../images/fish/guppy.png';
import betta from '../images/fish/betta.png';
import goldfish from '../images/fish/goldfish.png';
import angelfish from '../images/fish/angelfish.png';

function CheckFishPanel({ onClose, onAddFishClick }) {
  // This will be replaced with real data from the backend later
  // For now, we'll use a state to toggle between the two views for demonstration
  const [hasFish, setHasFish] = useState(true);
  const [selectedFish, setSelectedFish] = useState(null);
  
  // Get current date for comparison
  const currentDate = new Date();
  const today = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Sample fish data (this would come from backend)
  const sampleFishData = [
    {
      id: 1,
      name: 'Practice language',
      image: blueTang,
      lastCompleted: 'Feb 15 2023',
      isHungry: true,
      status: 'hungry',
      goals: 'be able to order food at a cafe'
    },
    {
      id: 2,
      name: 'Walk',
      image: clownFish,
      lastCompleted: 'Feb 10 2023',
      isHungry: true,
      status: 'hungry',
      goals: '10,000 steps daily'
    },
    {
      id: 3,
      name: 'Read books',
      image: guppy,
      lastCompleted: 'Feb 8 2023',
      isHungry: true,
      status: 'hungry',
      goals: 'finish 2 books per month'
    },
    {
      id: 4,
      name: 'Meditate',
      image: betta,
      lastCompleted: today,
      isHungry: false,
      status: 'full',
      goals: '15 minutes every morning'
    },
    {
      id: 5,
      name: 'Write journal',
      image: goldfish,
      lastCompleted: 'Feb 12 2023',
      isHungry: true,
      status: 'hungry',
      goals: 'document daily thoughts and progress'
    },
    {
      id: 6,
      name: 'Study coding',
      image: angelfish,
      lastCompleted: 'Feb 13 2023',
      isHungry: true,
      status: 'hungry',
      goals: 'build one small project per week'
    }
  ];
  
  // Toggle between views for demonstration purposes
  const toggleView = () => {
    setHasFish(!hasFish);
  };
  
  // Handle fish item click
  const handleFishClick = (fish) => {
    setSelectedFish(fish);
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
        <button 
          className="back-button" 
          onClick={onClose}
        >
          &lt; back
        </button>
        <button 
          className="check-fish-button add-fish-button" 
          onClick={onAddFishClick}
        >
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
        {sampleFishData.map(fish => (
          <div 
            key={fish.id} 
            className="fish-list-item"
            onClick={() => handleFishClick(fish)}
          >
            <div className="fish-list-image-container">
              <img src={fish.image} alt={fish.name} className="fish-list-image" />
            </div>
            <div className="fish-list-details">
              <h4 className="fish-list-name">{fish.name}</h4>
              <p className="fish-list-date">last completed: {fish.lastCompleted}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="button-container">
        <button 
          className="back-button" 
          onClick={onClose}
        >
          &lt; back
        </button>
        <button 
          className="check-fish-button add-fish-button" 
          onClick={onAddFishClick}
        >
          add fish
        </button>
      </div>
    </div>
  );
  
  // If a fish is selected, show its details
  if (selectedFish) {
    return (
      <FishDetailPanel 
        fish={selectedFish} 
        onBack={handleBackToList} 
        onClose={onClose} 
      />
    );
  }
  
  return (
    <div className="check-fish-overlay">
      <div className="check-fish-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="check-fish-title">check fish</h2>
        
        <div className="check-fish-content">
          {/* For development purposes, add a button to toggle between views */}
          <button 
            onClick={toggleView} 
            className="toggle-view-button"
          >
            Toggle View (for development only)
          </button>
          
          {hasFish ? renderFishListState() : renderNoFishState()}
        </div>
      </div>
    </div>
  );
}

export default CheckFishPanel; 