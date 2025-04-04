import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onToggleAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:5000/signup', { username, password });
            setMessage('Signup successful! You can now log in.');
            onToggleAuth(); // Switch to login screen
        } catch (err) {
            setMessage('Signup failed. Username might already exist.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
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
            <button onClick={handleSignup}>Signup</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;