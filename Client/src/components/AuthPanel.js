import React, { useState } from 'react';
import axios from 'axios';
import './AuthPanel.css';

function AuthPanel({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    try {
      setError(null);
      const endpoint = isSignup ? `${process.env.REACT_APP_API_URL}/signup`
      : `${process.env.REACT_APP_API_URL}/login`;
      const response = await axios.post(endpoint, { username, password });

      if (!isSignup) {
        // If logging in, store the token and notify the parent component
        const { token } = response.data;
        localStorage.setItem('token', token);
        onLogin();
      } else {
        // If signing up, show success message and switch to login
        setError('Signup successful! Please log in.');
        setIsSignup(false);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-panel">
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleAuth}>{isSignup ? 'Sign Up' : 'Log In'}</button>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
          {isSignup ? 'Log In' : 'Sign Up'}
        </span>
      </p>
    </div>
  );
}

export default AuthPanel;