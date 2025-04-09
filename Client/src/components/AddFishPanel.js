import React from 'react';
import './AddFishPanel.css';

// Import icons
import exerciseIcon from '../images/icons/exercise.png';
import readIcon from '../images/icons/read.png';
import studyIcon from '../images/icons/study.png';
import meditateIcon from '../images/icons/meditate.png';
import instrumentIcon from '../images/icons/instrument.png';
import medsIcon from '../images/icons/meds.png';
import waterIcon from '../images/icons/water.png';
import journalIcon from '../images/icons/journal.png';
import cleanIcon from '../images/icons/clean.png';

function AddFishPanel({ onClose, onHabitSelect }) {
  const habitOptions = [
    { id: 1, label: 'Exercise', icon: exerciseIcon },
    { id: 2, label: 'Read', icon: readIcon },
    { id: 3, label: 'Study', icon: studyIcon },
    { id: 4, label: 'Meditate', icon: meditateIcon },
    { id: 5, label: 'Practice Instrument', icon: instrumentIcon },
    { id: 6, label: 'Take Meds', icon: medsIcon },
    { id: 7, label: 'Drink Water', icon: waterIcon },
    { id: 8, label: 'Journal', icon: journalIcon },
    { id: 9, label: 'Clean', icon: cleanIcon }
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
        <h2 className="add-fish-title">Add Habit</h2>
        
        <div className="add-fish-content">
          <h3 className="add-fish-instruction">Pick a habit that you want to track!</h3>
          
          <div className="habit-grid">
            {habitOptions.map(habit => (
              <div 
                key={habit.id} 
                className="habit-item"
                onClick={() => handleHabitClick(habit)}
              >
                <div className="habit-icon-placeholder">
                  <img src={habit.icon} alt={habit.label} className="habit-icon" />
                </div>
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