import React, { useState, useEffect } from 'react';
import './App.css';
import MenuButton from './components/MenuButton';
import MenuGrid from './components/MenuGrid';
import TutorialPanel from './components/TutorialPanel';
import AboutPanel from './components/AboutPanel';
import AddFishPanel from './components/AddFishPanel';
import HabitDetailsPanel from './components/HabitDetailsPanel';
import FishSelectionPanel from './components/FishSelectionPanel';
import SettingsPanel from './components/SettingsPanel';
import CheckFishPanel from './components/CheckFishPanel';
import aquariumBg from './images/aquarium-bg.jpeg';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  // Menu and panel states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAddFishOpen, setIsAddFishOpen] = useState(false);
  const [isHabitDetailsOpen, setIsHabitDetailsOpen] =useState(false);
  const [isFishSelectionOpen, setIsFishSelectionOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCheckFishOpen, setIsCheckFishOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitDetails, setHabitDetails] = useState(null);
  const [completedHabits, setCompletedHabits] = useState([]);

  // Check if the user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Toggle between login and signup screens
  const toggleAuthScreen = () => {
    setShowSignup(!showSignup);
  };

  // Menu toggle logic
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsTutorialOpen(false);
    setIsAboutOpen(false);
    setIsAddFishOpen(false);
    setIsHabitDetailsOpen(false);
    setIsFishSelectionOpen(false);
    setIsSettingsOpen(false);
    setIsCheckFishOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openTutorial = () => {
    setIsTutorialOpen(true);
    closeMenu();
  };

  const closeTutorial = () => {
    setIsTutorialOpen(false);
  };

  const openAbout = () => {
    setIsAboutOpen(true);
    closeMenu();
  };

  const closeAbout = () => {
    setIsAboutOpen(false);
  };

  const openAddFish = () => {
    setIsAddFishOpen(true);
    closeMenu();
  };

  const closeAddFish = () => {
    setIsAddFishOpen(false);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
    closeMenu();
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const openCheckFish = () => {
    setIsCheckFishOpen(true);
    closeMenu();
  };

  const closeCheckFish = () => {
    setIsCheckFishOpen(false);
  };

  const handleHabitSelect = (habit) => {
    setSelectedHabit(habit);
    setIsAddFishOpen(false);
    setIsHabitDetailsOpen(true);
    console.log(`Selected habit from App: ${habit.label}`);
  };

  const handleBackToAddFish = () => {
    setIsHabitDetailsOpen(false);
    setIsAddFishOpen(true);
  };

  const handleHabitDetailsNext = (details) => {
    setHabitDetails(details);
    setIsHabitDetailsOpen(false);
    setIsFishSelectionOpen(true);
    console.log('Habit details:', details);
  };

  const closeHabitDetails = () => {
    setIsHabitDetailsOpen(false);
  };

  const handleBackToHabitDetails = () => {
    setIsFishSelectionOpen(false);
    setIsHabitDetailsOpen(true);
  };

  const handleHabitComplete = (completeHabit) => {
    // Add the completed habit with fish selection to our array
    setCompletedHabits([...completedHabits, completeHabit]);
    console.log('Completed habit:', completeHabit);

    // Close all panels and return to aquarium
    setIsFishSelectionOpen(false);
    setSelectedHabit(null);
    setHabitDetails(null);
  };

  const closeFishSelection = () => {
    setIsFishSelectionOpen(false);
  };

  // Render login/signup screen if not logged in
  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onToggleAuth={toggleAuthScreen} />
    ) : (
      <Login onLogin={handleLogin} onToggleAuth={toggleAuthScreen} />
    );
  }

  // Render the main app if logged in
  return (
    <div className="App">
      <div className="aquarium-container" style={{ backgroundImage: `url(${aquariumBg})` }}>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        {/* Menu components */}
        <MenuButton
          isOpen={
            isMenuOpen ||
            isTutorialOpen ||
            isAboutOpen ||
            isAddFishOpen ||
            isHabitDetailsOpen ||
            isFishSelectionOpen ||
            isSettingsOpen ||
            isCheckFishOpen
          }
          toggleMenu={toggleMenu}
        />
        <MenuGrid
          isOpen={isMenuOpen}
          onClose={closeMenu}
          onTutorialClick={openTutorial}
          onAboutClick={openAbout}
          onAddFishClick={openAddFish}
          onSettingsClick={openSettings}
          onCheckFishClick={openCheckFish}
        />
        {isTutorialOpen && <TutorialPanel onClose={closeTutorial} />}
        {isAboutOpen && <AboutPanel onClose={closeAbout} />}
        {isAddFishOpen && <AddFishPanel onClose={closeAddFish} onHabitSelect={handleHabitSelect} />}
        {isSettingsOpen && <SettingsPanel onClose={closeSettings} />}
        {isCheckFishOpen && <CheckFishPanel onClose={closeCheckFish} onAddFishClick={openAddFish} />}
        {isHabitDetailsOpen && selectedHabit && (
          <HabitDetailsPanel
            onClose={closeHabitDetails}
            onBack={handleBackToAddFish}
            onNext={handleHabitDetailsNext}
            selectedHabit={selectedHabit}
          />
        )}
        {isFishSelectionOpen && habitDetails && (
          <FishSelectionPanel
            onClose={closeFishSelection}
            onBack={handleBackToHabitDetails}
            onComplete={handleHabitComplete}
            habitDetails={habitDetails}
          />
        )}
      </div>
    </div>
  );
}

export default App;