import React from 'react';
import './TutorialPanel.css';

function TutorialPanel({ onClose }) {
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="tutorial-title">tutorial</h2>
        
        <div className="tutorial-content">
          <h3 className="welcome-text">Welcome To Fishly!</h3>
          
          <p className="tutorial-paragraph">
            Fishly is a habit tracking app that<br />
            uses fish to represent the habits that<br />
            you are trying to build.
          </p>
          
          <p className="tutorial-paragraph">
            Every time you do your habit, log<br />
            into fishly and feed your fish. But<br />
            be careful! Your fish will get hungry<br />
            if you go too long without feeding it.
          </p>
          
          <p className="tutorial-paragraph emphasis">
            Get started by adding a fish!
          </p>
        </div>
      </div>
    </div>
  );
}

export default TutorialPanel; 