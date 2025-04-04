const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Check if the username already exists
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Create a new user
        await createUser({ username, password });
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Find the user by username
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in.' });
    }
});

module.exports = router;