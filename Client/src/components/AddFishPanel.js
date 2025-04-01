import React from 'react';
import './AddFishPanel.css';

function AddFishPanel({ onClose, onHabitSelect }) {
  const habitOptions = [
    { id: 1, label: 'exercise' },
    { id: 2, label: 'read' },
    { id: 3, label: 'study' },
    { id: 4, label: 'meditate' },
    { id: 5, label: 'practice instrument' },
    { id: 6, label: 'take meds' },
    { id: 7, label: 'learn language' },
    { id: 8, label: 'journal' },
    { id: 9, label: 'clean' }
  ];

  const handleHabitClick = (habit) => {
    console.log(`Selected habit: ${habit.label}`);
    if (onHabitSelect) {
      onHabitSelect(habit);
    }
  };

  return (
    <div className="add-fish-overlay">
      <div className="add-fish-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="add-fish-title">add fish</h2>
        
        <div className="add-fish-content">
          <h3 className="add-fish-instruction">Pick a habit that you want to track!</h3>
          
          <div className="habit-grid">
            {habitOptions.map(habit => (
              <div 
                key={habit.id} 
                className="habit-item"
                onClick={() => handleHabitClick(habit)}
              >
                <div className="habit-icon-placeholder"></div>
                <span className="habit-label">{habit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFishPanel; 