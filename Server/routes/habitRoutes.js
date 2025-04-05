const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } = require('../models/Habit');

// Debug the imported functions
console.log('createHabit:', createHabit);
console.log('getHabits:', getHabits);
console.log('getHabitById:', getHabitById);
console.log('updateHabit:', updateHabit);
console.log('deleteHabit:', deleteHabit);
console.log('authenticate:', authenticate);

// Get all habits
router.get('/habits', authenticate, async (req, res) => {
    console.log('Authenticated user:', req.user); // Debugging log
    try {
        const habits = await getHabits();
        res.status(200).json(habits);
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
});

router.post('/habits', authenticate, async (req, res) => {
    console.log('Authenticated user:', req.user); // Debugging log
    console.log('Request body:', req.body);

    const { habitName, frequency, notifications, goals, notes, fish } = req.body;

    const newHabit = {
        user: req.user.userId, // Associate habit with the logged-in user
        habitName,
        frequency,
        notifications,
        goals,
        notes,
        fish,
        completions: [],
    };

    try {
        console.log('Inserting habit into MongoDB:', newHabit);
        await createHabit(newHabit);
        res.status(201).json({ message: 'Habit added successfully' });
    } catch (error) {
        console.error('Error creating habit:', error);
        res.status(500).json({ error: 'Failed to add habit' });
    }
});

// Update a habit
router.put('/habits/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { habitName, frequency, notifications, goals, notes } = req.body;

    try {
        const updatedHabit = {
            habitName,
            frequency,
            notifications,
            goals,
            notes,
        };
        await updateHabit(id, updatedHabit);
        res.status(200).json({ message: 'Habit updated successfully' });
    } catch (error) {
        console.error('Error updating habit:', error);
        res.status(500).json({ error: 'Failed to update habit' });
    }
});

// Delete a habit
router.delete('/habits/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        await deleteHabit(id);
        res.status(200).json({ message: 'Habit deleted successfully' });
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.status(500).json({ error: 'Failed to delete habit' });
    }
});

module.exports = router;