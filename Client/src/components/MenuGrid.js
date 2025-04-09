import React from 'react';
import './MenuGrid.css';

// Import icons
import checkFishIcon from '../images/icons/check-fish.png';
import addFishIcon from '../images/icons/add-fish.png';
import tutorialIcon from '../images/icons/tutorial.png';
import aboutIcon from '../images/icons/about.png';
import settingsIcon from '../images/icons/settings.png';

function MenuGrid({ isOpen, onClose, onTutorialClick, onAboutClick, onAddFishClick, onSettingsClick, onCheckFishClick }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 1, label: 'check fish', icon: checkFishIcon },
    { id: 2, label: 'add fish', icon: addFishIcon },
    { id: 3, label: 'tutorial', icon: tutorialIcon },
    { id: 4, label: 'about', icon: aboutIcon },
    { id: 5, label: 'settings', icon: settingsIcon }
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
              <div className="menu-icon-placeholder">
                <img src={item.icon} alt={item.label} className="menu-icon" />
              </div>
              <div className="menu-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuGrid;