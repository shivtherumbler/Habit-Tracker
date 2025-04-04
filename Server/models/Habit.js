const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// Create a new habit
const createHabit = async (habitData) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    console.log('Data being inserted into MongoDB:', habitData); // Log the data
    return await habitsCollection.insertOne(habitData);
};

// Get all habits
const getHabits = async () => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    return await habitsCollection.find().toArray();
};

// Get a habit by ID
const getHabitById = async (id) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
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