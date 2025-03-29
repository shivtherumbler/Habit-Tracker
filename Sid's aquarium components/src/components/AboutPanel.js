import React from 'react';
import './AboutPanel.css';

function AboutPanel({ onClose }) {
  return (
    <div className="about-overlay">
      <div className="about-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2 className="about-title">about</h2>
        
        <div className="about-content">
          <p className="about-paragraph">
            fishly is developed by team Echo in<br />
            fulfillment of the program<br />
            requirements of the IMM program at<br />
            Sheridan college.
          </p>
          
          <p className="about-paragraph team-members">
            Our team: Shiv, Sid, Kanwal, Meg
          </p>
          
          <p className="about-paragraph contact">
            Questions? Contact us at the WDSS<br />
            discord!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPanel; 