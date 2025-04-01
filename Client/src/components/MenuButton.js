import React from 'react';
import './MenuButton.css';

function MenuButton({ isOpen, toggleMenu }) {
  return (
    <button className={`menu-button ${isOpen ? 'is-open' : ''}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default MenuButton; 