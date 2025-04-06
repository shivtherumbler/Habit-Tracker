const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/User');
const { getDb } = require('../config/db');

const router = express.Router();

// Use the JWT secret from the environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const db = getDb();
        const usersCollection = db.collection('users');

        // Check if the username already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = { username, password: hashedPassword };
        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

router.get('/signup', (req, res) => {
    res.send('Signup route is working, but use POST to log in.');
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const db = getDb();
        const usersCollection = db.collection('users');

        // Find the user by username
        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Generate a JWT token with only userId
        const token = jwt.sign(
            { userId: user._id.toString() }, // Include only userId
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Generated token payload:', { userId: user._id }); // Debugging log
        console.log('Generated token:', token); // Debugging log
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/login', (req, res) => {
    res.send('Login route is working, but use POST to log in.');
});

module.exports = router;