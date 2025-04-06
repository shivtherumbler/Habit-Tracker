const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// Create a new habit
const createHabit = async (habitData) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    console.log('Data being inserted into MongoDB:', habitData); // Debugging log
    return await habitsCollection.insertOne(habitData);
};

// Get all habits
const getHabits = async (userId) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    console.log('Filtering habits for userId:', userId); // Debugging log
    const filteredHabits = await habitsCollection.find({ userId }).toArray(); // Filter by userId
    console.log('Filtered habits from DB:', filteredHabits); // Debugging log
    return filteredHabits;
};

// Get a habit by ID
const getHabitById = async (id) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');

    // Convert id to ObjectId
    return await habitsCollection.findOne({ _id: new ObjectId(id) });
};

// Update a habit
const updateHabit = async (id, habitData) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    return await habitsCollection.updateOne({ _id: new ObjectId(id) }, { $set: habitData });
};

// Delete a habit
const deleteHabit = async (id) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    return await habitsCollection.deleteOne({ _id: new ObjectId(id) });
};

module.exports = { createHabit, getHabits, getHabitById, updateHabit, deleteHabit };