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
import FishDetailPanel from './components/FishDetailPanel';
import AuthPanel from './components/AuthPanel';
import aquariumBg from './images/aquarium-bg.jpeg';
import apiClient from './apiClient';


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
  const [habits, setHabits] = useState([]); // Store habits fetched from the backend
  const [selectedFish, setSelectedFish] = useState(null); // Selected fish for stats

  // Check if the user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch habits from the backend
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await apiClient('/habits', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHabits(response.data); // Set the habits data
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    };
  
    fetchHabits();
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

  // Handle fish click to show stats
  const handleFishClick = (habit) => {
    setSelectedFish(habit);
  };

  // Close the FishDetailPanel
  const handleCloseStats = () => {
    setSelectedFish(null);
  };

  return (
    <div className="App">
      <div className="aquarium-container" style={{ backgroundImage: `url(${aquariumBg})` }}>
      {habits.map((habit) => {
  const isSwimmingRight = Math.random() > 0.5; // Randomly decide swim direction
  const randomTop = Math.random() * 80; // Random vertical position (0-80% of viewport height)
  const randomDuration = 20 + Math.random() * 5; // Random swim duration (10-15 seconds)

  return (
    <div
      key={`swimming-${habit._id}`}
      className={`swimming-fish ${isSwimmingRight ? 'swim-right' : 'swim-left'}`}
      onClick={() => handleFishClick(habit)}
      style={{
        backgroundImage: `url(${habit.fish?.image || '/images/fish/default-fish.png'})`,
        top: `${randomTop}vh`, // Random vertical position
        '--animation-duration': `${randomDuration}s`, // Random swim duration
      }}
    ></div>
  );
})}

        {!isLoggedIn ? (
          <AuthPanel onLogin={handleLogin} />
        ) : (
          <>
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
            {selectedFish && (
              <FishDetailPanel
                fish={selectedFish.fish}
                onBack={handleCloseStats}
                onClose={handleCloseStats}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;