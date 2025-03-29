import React from 'react';
import './NavigationButtons.css';

function NavigationButtons({ onBack, onNext, nextDisabled }) {
  return (
    <div className="button-container">
      <button className="back-button" onClick={onBack}>
        &lt; back
      </button>
      <button 
        className={`next-button ${nextDisabled ? 'disabled' : ''}`} 
        onClick={onNext}
        disabled={nextDisabled}
      >
        next &gt;
      </button>
    </div>
  );
}

export default NavigationButtons; 