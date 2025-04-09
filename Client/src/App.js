import React, { useState, useEffect, useRef } from 'react';
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
import FishStatsPanel from './components/FishStatsPanel';
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
  const [userId, setUserId] = useState(null); // Add a state to store the userId
  const [volume, setVolume] = useState(50); // Default volume at 50%
  const audioRef = useRef(null); // Reference to the audio element
  const [musicEnabled, setMusicEnabled] = useState(true); // Track if music is enabled
  const [audioInitialized, setAudioInitialized] = useState(false); // Track if audio is initialized
  const [showStats, setShowStats] = useState(false); // State to toggle between panels


  // Handle volume change from SettingsPanel
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100; // Set audio volume (0 to 1)
    }
  };

   // Handle music toggle
   const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
    if (audioRef.current) {
      if (!musicEnabled) {
        audioRef.current.play().catch((err) => {
          console.error('Error playing audio:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Initialize audio playback after user interaction
  const initializeAudio = () => {
    if (audioRef.current && !audioInitialized) {
      audioRef.current.volume = volume / 100; // Set initial volume
      audioRef.current.play().catch((err) => {
        console.error('Error playing audio:', err);
      });
      setAudioInitialized(true); // Mark audio as initialized
    }
  };

// Attach event listener to initialize audio on user interaction
useEffect(() => {
  document.addEventListener('click', initializeAudio);
  return () => {
    document.removeEventListener('click', initializeAudio);
  };
}, [audioInitialized, volume, initializeAudio]); // Added initializeAudio

   // Reusable function to fetch habits
   const fetchHabits = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Unable to fetch habits.');
        return;
      }

      console.log('Fetching habits with token:', token);

      const response = await apiClient('/habits', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Habits fetched:', response.data);

      // Decode the token to extract the userId
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      // Filter habits by the logged-in user's ID
      const userHabits = response.data.filter((habit) => habit.userId === userId);
      setHabits(userHabits); // Set the filtered habits data
      setUserId(userId); // Save the userId in state
    } catch (err) {
      console.error('Error fetching habits:', err);
    }
  };

  // Fetch habits on app load if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchHabits(); // Fetch habits on page reload
    }
  }, []);

  const handleLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      // Decode the token to extract the userId
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error('UserId not found in token');
      }

      setUserId(userId);
      setIsLoggedIn(true);
      setIsMenuOpen(true); // Open the menu after login

      // Fetch habits for the logged-in user
      await fetchHabits(); // Reuse the fetchHabits function
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

// Handle logout
const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  setIsSettingsOpen(false);
  setHabits([]); // Clear the habits state
  setUserId(null); // Clear the userId state
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
    setIsMenuOpen(true);
  };

  const openAbout = () => {
    setIsAboutOpen(true);
    closeMenu();
  };

  const closeAbout = () => {
    setIsAboutOpen(false);
    setIsMenuOpen(true);
  };

  const openAddFish = () => {
    setIsAddFishOpen(true);
    closeMenu();
  };

  const closeAddFish = () => {
    setIsAddFishOpen(false);
    setIsMenuOpen(true);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
    closeMenu();
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
    setIsMenuOpen(true);
  };

  const openCheckFish = () => {
    setIsCheckFishOpen(true);
    closeMenu();
  };

  const closeCheckFish = () => {
    setIsCheckFishOpen(false);
    setIsMenuOpen(true);
    //fetchHabits(); // Fetch habits on page reload
  };

  const handleHabitSelect = (habit) => {
    setSelectedHabit(habit);
    setIsAddFishOpen(false);
    setIsHabitDetailsOpen(true);
    setIsCheckFishOpen(false); // Close the check fish panel
    console.log(`Selected habit from App: ${habit.label}`);
  };

  const handleBackToAddFish = () => {
    setIsHabitDetailsOpen(false);
    setIsAddFishOpen(true);
    //fetchHabits(); // Fetch habits to update the UI
    // setIsMenuOpen(true); // Open the menu
  };

  const handleHabitDetailsNext = (details) => {
    setHabitDetails(details);
    setIsHabitDetailsOpen(false);
    setIsFishSelectionOpen(true);
    setIsHabitDetailsOpen(false);
    console.log('Habit details:', details);
  };

  const closeHabitDetails = () => {
    setIsHabitDetailsOpen(false);
    setIsMenuOpen(true);
    //fetchHabits(); // Fetch habits on page reload
  };

  const handleBackToHabitDetails = () => {
    setIsFishSelectionOpen(false);
    setIsHabitDetailsOpen(true);
    //fetchHabits(); // Fetch habits to update the UI
    // setIsMenuOpen(true); // Open the menu
  };

  const handleHabitComplete = async (completeHabit) => {
    try {
        setCompletedHabits([...completedHabits, completeHabit]);
        console.log('Completed habit:', completeHabit);

        setIsFishSelectionOpen(false);
        setSelectedHabit(null);
        setHabitDetails(null);

        // Refetch habits after completing a habit
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await apiClient('/habits', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        console.log('Habits refetched after completing a habit:', response.data);

        // Filter habits by the logged-in user's ID
        const userHabits = response.data.filter(habit => habit.userId === userId);
        setHabits(userHabits); // Update the habits state
    } catch (err) {
        console.error('Error refetching habits after completing a habit:', err);
    }
};
  const closeFishSelection = () => {
    setIsFishSelectionOpen(false);
    setIsMenuOpen(true);
    //fetchHabits(); // Fetch habits on page reload
  };

  // Handle fish click to show stats
  const handleFishClick = (habit) => {
    setSelectedFish(habit);
  };

  // Close the FishDetailPanel
  const handleCloseStats = () => {
    setSelectedFish(null);
    //fetchHabits(); // Fetch habits to update the UI
    setIsMenuOpen(true); // Open the menu
  };

  const handleReloadFishDetailPanel = (updatedFish) => {
    // Temporarily close the panel
    setSelectedFish(null);
  
    // Reopen the panel after a short delay
    setTimeout(() => {
      setSelectedFish(updatedFish); // Reopen the panel with updated data
    }, 100); // Add a slight delay for smooth transition
  };

  return (
    <div className="App">
      <div className="aquarium-container" style={{ backgroundImage: `url(${aquariumBg})` }}>
      {habits.map((habit) => {
  const isSwimmingRight = Math.random() > 0.5; // Randomly decide swim direction
  const randomTop = Math.random() * 80; // Random vertical position (0-80% of viewport height)
  const randomDuration = 20 + Math.random() * 5; // Random swim duration (20-25 seconds)

  return (
    <div
      key={`swimming-${habit._id}`}
      className={`swimming-fish ${isSwimmingRight ? 'swim-right' : 'swim-left'}`}
      onClick={() => handleFishClick(habit)}
      style={{
        backgroundImage: `url(${habit.fish?.image || '/images/fish/default-fish.png'})`,
        top: `${randomTop}vh`,
        '--animation-duration': `${randomDuration}s`,
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
            {isSettingsOpen && (
          <SettingsPanel
          onClose={closeSettings}
          onLogout={handleLogout}
          onVolumeChange={handleVolumeChange} // Pass volume change handler
          onMusicToggle={handleMusicToggle} // Pass music toggle handler
          volume={volume} // Pass current volume
          musicEnabled={musicEnabled} // Pass current music state
        />
        )}
            {isCheckFishOpen && (
              <CheckFishPanel
                onClose={closeCheckFish}
                onAddFishClick={() => {
                  closeCheckFish();
                  openAddFish();
                }}
              />
            )}
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
           fish={selectedFish}
           habitId={selectedFish._id}
           onClose={() => {
             setSelectedFish(null);
             //fetchHabits(); // Update habits when closing the panel
             setIsCheckFishOpen(true); // Open the menu
           }}
           onBack={() => {
             setSelectedFish(null);
            // fetchHabits(); // Update habits when navigating back
             setIsCheckFishOpen(true); // Open the menu
           }}
           onReload={fetchHabits} // Pass the fetchHabits function as onReload
           onShowStats={() => setShowStats(true)} // Toggle to FishStatsPanel
         />
          )}

          {selectedFish && (
          <FishStatsPanel
          fish={selectedFish}
          habitId={selectedFish._id}
          onClose={() => {
            setSelectedFish(null);
            //fetchHabits(); // Update habits when closing the panel
            setIsCheckFishOpen(true); // Open the menu
          }}
          onBack={() => {
            setShowStats(false); // Navigate back to FishDetailPanel
            //fetchHabits(); // Update habits when navigating back
          }}
          onReload={fetchHabits} // Pass the fetchHabits function as onReload
        />
          )}
          </>
        )}
      </div>
      <audio ref={audioRef} src="/audio/aquarium-fish.mp3" loop />
    </div>
  );
}

export default App;