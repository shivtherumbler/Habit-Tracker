const express = require('express');
const router = express.Router();
const { createHabit, getHabits, getHabitById } = require('../models/Habit');

// Show all habits
router.get('/habits', async (req, res) => {
    try {
        const habits = await getHabits();
        res.render('habits', { habits });
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.render('habits', { habits: [] });
    }
});

// Show form to add a new habit
router.get('/habits/add', (req, res) => {
    res.render('add-habit');
});

// Create a new habit
router.post('/habits', async (req, res) => {
    const { user, habitName, frequency, notifications, goals, notes } = req.body;

    const newHabit = {
        user,
        habitName,
        frequency,
        notifications: notifications === 'true',
        goals,
        notes,
        completions: [] // Start with an empty completions array
    };

    try {
        await createHabit(newHabit);
        res.redirect('/habits');
    } catch (error) {
        console.error('Error creating habit:', error);
        res.render('add-habit', { error: 'Error creating habit' });
    }
});

// Show form to edit a habit
router.get('/habits/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await getHabitById(id);
        res.render('edit-habit', { habit });
    } catch (error) {
        console.error('Error fetching habit for editing:', error);
        res.redirect('/habits');
    }
});

// Update an existing habit
router.post('/habits/:id', async (req, res) => {
    const { id } = req.params;
    const { habitName, frequency, notifications, goals, notes } = req.body;

    try {
        const updatedHabit = {
            habitName,
            frequency,
            notifications: notifications === 'true',
            goals,
            notes
        };
        await updateHabit(id, updatedHabit);
        res.redirect('/habits');
    } catch (error) {
        console.error('Error updating habit:', error);
        res.redirect(`/habits/${id}/edit`);
    }
});

module.exports = router;
