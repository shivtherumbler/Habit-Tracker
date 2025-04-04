import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store the token in localStorage
            onLogin(); // Notify the parent component
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Failed to log in.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;