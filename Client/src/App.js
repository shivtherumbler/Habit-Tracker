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
import AuthPanel from './components/AuthPanel';
import aquariumBg from './images/aquarium-bg.jpeg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAddFishOpen, setIsAddFishOpen] = useState(false);
  const [isHabitDetailsOpen, setIsHabitDetailsOpen] = useState(false);
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
    setCompletedHabits([...completedHabits, completeHabit]);
    console.log('Completed habit:', completeHabit);

    setIsFishSelectionOpen(false);
    setSelectedHabit(null);
    setHabitDetails(null);
  };

  const closeFishSelection = () => {
    setIsFishSelectionOpen(false);
  };

  return (
    <div className="App">
      <div className="aquarium-container" style={{ backgroundImage: `url(${aquariumBg})` }}>
        {!isLoggedIn ? (
          <AuthPanel onLogin={handleLogin} />
        ) : (
          <>
            {/* <button onClick={handleLogout} className="logout-button">
              Logout
            </button> */}
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
            {isSettingsOpen && <SettingsPanel onClose={closeSettings} onLogout={handleLogout} />}
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;