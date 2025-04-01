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

// Route to Show Edit Form for Habit
app.get('/habits/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.getHabitById(id);
        if (habit) {
            res.render('edit-habit', { habit });
        } else {
            res.redirect('/habits');
        }
    } catch (error) {
        console.error('Error fetching habit:', error);
        res.redirect('/habits');
    }
});

// Handle Form Submission for Updating a Habit
app.post('/habits/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, frequency, notifications, goals, notes } = req.body;
    const updatedHabit = { name, description, frequency, notifications, goals, notes };
    try {
        await Habit.updateHabit(id, updatedHabit);
        res.redirect('/habits'); // Redirect to the habits list after updating
    } catch (error) {
        console.error('Error updating habit:', error);
        res.redirect(`/habits/${id}/edit`);
    }
});

// Handle Deleting a Habit
app.post('/habits/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        await Habit.deleteHabit(id);
        res.redirect('/habits'); // Redirect to the habits list after deleting
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.redirect('/habits');
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
