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
    try {
        const userHabits = await getHabits(req.user.userId); // Fetch habits filtered by userId in the database
        res.status(200).json(userHabits); // Return only the user's habits
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
});

router.get('/habits/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const habit = await getHabitById(id); // Fetch habit by ID from the database
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        res.status(200).json(habit); // Return the habit details
    } catch (error) {
        console.error('Error fetching habit:', error);
        res.status(500).json({ error: 'Failed to fetch habit' });
    }
});

router.post('/habits', authenticate, async (req, res) => {
    const { habitName, frequency, notifications, goals, notes, fish } = req.body;

    const newHabit = {
        userId: req.user.userId, // Associate habit with userId
        habitName,
        frequency,
        notifications,
        goals,
        notes,
        fish,
        completions: [],
    };

    try {
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