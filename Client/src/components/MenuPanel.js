import React from 'react';
import './MenuPanel.css';

function MenuPanel({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="menu-panel">
      {/* Menu options will go here */}
      <p>Your aquarium menu options will appear here</p>
    </div>
  );
}

export default MenuPanel; 