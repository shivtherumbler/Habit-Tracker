const express = require('express');
const app = express();
const Habit = require('./models/Habit'); // Import your Habit model

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Show All Habits
app.get('/habits', async (req, res) => {
    try {
        const habits = await Habit.find(); // Fetch all habits
        res.render('habits', { habits });
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.render('habits', { habits: [] });
    }
});

// Show Form to Create a New Habit
app.get('/habits/add', (req, res) => {
    res.render('add-habit');
});

// Handle Form Submission for Creating a Habit
app.post('/habits', async (req, res) => {
    const { name, description } = req.body;
    const newHabit = new Habit({ name, description });
    try {
        await newHabit.save();
        res.redirect('/habits'); // Redirect to the habits list after saving
    } catch (error) {
        console.error('Error creating habit:', error);
        res.render('new-habit', { error: 'Error creating habit' });
    }
});

// Show Edit Form for a Habit
app.get('/habits/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findById(id);
        res.render('edit-habit', { habit });
    } catch (error) {
        console.error('Error fetching habit:', error);
        res.redirect('/habits');
    }
});

// Handle Form Submission for Updating a Habit
app.post('/habits/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await Habit.findByIdAndUpdate(id, { name, description });
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
        await Habit.findByIdAndDelete(id);
        res.redirect('/habits'); // Redirect to the habits list after deleting
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.redirect('/habits');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
