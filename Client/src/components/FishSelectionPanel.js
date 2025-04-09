import React, { useState } from 'react';
import './FishSelectionPanel.css';
// Import the fish images
import blueTang from '../images/fish/blue-tang.png';
import clownFish from '../images/fish/clown-fish.png';
import guppy from '../images/fish/guppy.png';
import betta from '../images/fish/betta.png';
import goldfish from '../images/fish/goldfish.png';
import angelfish from '../images/fish/angelfish.png';
import HabitConfirmationPanel from './HabitConfirmationPanel';
import NavigationButtons from './NavigationButtons';

function FishSelectionPanel({ onClose, onBack, onComplete, habitDetails }) {
  const [selectedFish, setSelectedFish] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Define fish options with images and names
  const fishOptions = [
    { id: 1, name: 'blue tang', image: blueTang },
    { id: 2, name: 'clown fish', image: clownFish },
    { id: 3, name: 'guppy', image: guppy },
    { id: 4, name: 'betta', image: betta },
    { id: 5, name: 'goldfish', image: goldfish },
    { id: 6, name: 'angelfish', image: angelfish },
    { id: 7, name: 'blue tang', image: blueTang }, // Duplicated to have 8 options
    { id: 8, name: 'clown fish', image: clownFish } // Duplicated to have 8 options
  ];

  const handleFishSelect = (fish) => {
    setSelectedFish(fish);
  };

  const handleBackClick = () => {
    if (onBack) onBack();
  };

  const handleNextClick = () => {
    if (selectedFish) {
      // Instead of completing immediately, show confirmation
      setShowConfirmation(true);
    }
  };

  const handleConfirmationBack = () => {
    // Go back to fish selection from confirmation screen
    setShowConfirmation(false);
  };

  // If confirmation is shown, render the confirmation panel
  if (showConfirmation) {
    return (
      <HabitConfirmationPanel
        onClose={onClose}
        onBack={handleConfirmationBack}
        onComplete={onComplete}
        habitDetails={{
          ...habitDetails,
          fish: selectedFish
        }}
      />
    );
  }

  return (
    <div className="fish-selection-overlay">
      <div className="fish-selection-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="fish-selection-title">Choose Fish</h2>
        
        <div className="fish-selection-content">
          <h3 className="fish-selection-instruction">Pick a fish to represent your habit!</h3>
          
          <div className="fish-grid">
            {fishOptions.map(fish => (
              <div 
                key={fish.id} 
                className={`fish-item ${selectedFish && selectedFish.id === fish.id ? 'selected' : ''}`}
                onClick={() => handleFishSelect(fish)}
              >
                <div className="fish-image-container">
                  <img src={fish.image} alt={fish.name} className="fish-image" />
                </div>
                <div className="fish-name">{fish.name}</div>
              </div>
            ))}
          </div>
          
          <NavigationButtons 
            onBack={handleBackClick} 
            onNext={handleNextClick}
            nextDisabled={!selectedFish}
          />
        </div>
      </div>
    </div>
  );
}

export default FishSelectionPanel; 