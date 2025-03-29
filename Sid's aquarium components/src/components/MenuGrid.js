import React from 'react';
import './MenuGrid.css';

function MenuGrid({ isOpen, onClose, onTutorialClick, onAboutClick, onAddFishClick, onSettingsClick, onCheckFishClick }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 1, label: 'check fish' },
    { id: 2, label: 'add fish' },
    { id: 3, label: 'stats' },
    { id: 4, label: 'camera' },
    { id: 5, label: 'shop' },
    { id: 6, label: 'tank' },
    { id: 7, label: 'tutorial' },
    { id: 8, label: 'about' },
    { id: 9, label: 'settings' }
  ];

  const handleMenuItemClick = (item) => {
    console.log(`Clicked on ${item.label}`);
    if (item.label === 'tutorial') {
      onTutorialClick();
    } else if (item.label === 'about') {
      onAboutClick();
    } else if (item.label === 'add fish') {
      onAddFishClick();
    } else if (item.label === 'settings') {
      onSettingsClick();
    } else if (item.label === 'check fish') {
      onCheckFishClick();
    }
    // Future functionality for other menu items will be added here
  };

  const handleOverlayClick = (e) => {
    // Close menu only if clicking the overlay background, not the menu items
    if (e.target.classList.contains('menu-grid-overlay')) {
      onClose();
    }
  };

  return (
    <div className="menu-grid-overlay" onClick={handleOverlayClick}>
      <div className="menu-grid-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <div className="menu-grid">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className="menu-grid-item"
              onClick={() => handleMenuItemClick(item)}
            >
              <div className="menu-icon-placeholder"></div>
              <div className="menu-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuGrid; 