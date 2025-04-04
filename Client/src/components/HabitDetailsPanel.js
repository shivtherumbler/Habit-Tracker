import React, { useState } from 'react';
import './HabitDetailsPanel.css';
import NavigationButtons from './NavigationButtons';

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

  return (
    <div className="habit-details-overlay">
      <div className="habit-details-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="habit-details-title">add fish</h2>

        <div className="habit-details-content">
          <div className="form-content">
            <h3 className="habit-name">{selectedHabit.label}</h3>

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