import React, { useState } from 'react';
import './HabitDetailsPanel.css';
import NavigationButtons from './NavigationButtons';

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

function HabitDetailsPanel({ onClose, onBack, onNext, selectedHabit }) {
  const [frequency, setFrequency] = useState(3);
  const [notificationTime, setNotificationTime] = useState('');
  const [goals, setGoals] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  const handleFrequencyChange = (e) => {
    setFrequency(parseInt(e.target.value));
  };

  const handleNotificationTimeChange = (e) => {
    setNotificationTime(e.target.value);
  };

  const handleGoalsChange = (e) => {
    setGoals(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleBackClick = () => {
    if (onBack) onBack();
  };

  const handleNextClick = () => {
    if (!frequency || !notificationTime || !goals || !notes) {
      setError('Please fill out all fields before proceeding.');
      return;
    }

    const habitDetails = {
      habitName: selectedHabit.label,
      frequency,
      notifications: notificationTime,
      goals,
      notes,
    };

    if (onNext) onNext(habitDetails);
  };

   // Map the habit label to the corresponding icon
   const habitIcons = {
    Exercise: exerciseIcon,
    Read: readIcon,
    Study: studyIcon,
    Meditate: meditateIcon,
    'Practice Instrument': instrumentIcon,
    'Take Meds': medsIcon,
    'Drink Water': waterIcon,
    Journal: journalIcon,
    Clean: cleanIcon,
  };

  const habitIcon = habitIcons[selectedHabit.label];

  return (
    <div className="habit-details-overlay">
      <div className="habit-details-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="habit-details-title">Add Fish</h2>

        <div className="habit-details-content">
          <div className="form-content">
            <h3 className="habit-name">{selectedHabit.label}</h3>

             {/* Display the icon below the label */}
             {habitIcon && (
              <div className="habit-icon-container">
                <img src={habitIcon} alt={selectedHabit.label} className="habit-icon" />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="frequency">frequency</label>
              <div className="frequency-selector">
                <input
                  type="number"
                  id="frequency"
                  min="1"
                  max="7"
                  value={frequency}
                  onChange={handleFrequencyChange}
                />
                <span className="frequency-label">times per week</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notification">notifications</label>
              <input
                type="time"
                id="notification"
                value={notificationTime}
                onChange={handleNotificationTimeChange}
                className="notification-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="goals">goals</label>
              <textarea
                id="goals"
                value={goals}
                onChange={handleGoalsChange}
                placeholder="What do you want to achieve with this habit?"
                className="text-input"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="notes">other notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={handleNotesChange}
                placeholder="Any additional notes about this habit"
                className="text-input"
              ></textarea>
            </div>
          </div>
          
          {error && <p className="error-message">{error}</p>}

<NavigationButtons onBack={handleBackClick} onNext={handleNextClick} />
</div>
</div>
</div>
);
}

export default HabitDetailsPanel;