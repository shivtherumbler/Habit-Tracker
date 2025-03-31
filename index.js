// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const Habit = require('./models/Habit');
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files (styles.css, scripts.js, etc.)

// Set View Engine
app.set('view engine', 'hbs');

// Connect to the Database
connectDB();

// Routes

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Show All Habits
app.get('/habits', async (req, res) => {
    try {
        const habits = await Habit.getHabits();
        res.render('habits', { habits });
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.render('habits', { habits: [] });
    }
});

// Show Add Habit Form
app.get('/habits/add', (req, res) => {
    res.render('add-habit');
});

// Handle Adding a New Habit
app.post('/habits', async (req, res) => {
    const { name, description, frequency, notifications, goals, notes } = req.body;
    const newHabit = { name, description, frequency, notifications, goals, notes, completions: [] };
    try {
        await Habit.createHabit(newHabit);
        res.redirect('/habits');
    } catch (error) {
        console.error('Error creating habit:', error);
        res.render('add-habit', { error: 'Error creating habit' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
