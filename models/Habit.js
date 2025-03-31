// models/Habit.js
const { getDb } = require('../config/db');

const createHabit = async (habitData) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    return await habitsCollection.insertOne(habitData);
};

const getHabits = async () => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    return await habitsCollection.find().toArray();
};

const getHabitById = async (id) => {
    const db = getDb();
    const habitsCollection = db.collection('habits');
    return await habitsCollection.findOne({ _id: new ObjectId(id) });
};

module.exports = { createHabit, getHabits, getHabitById };
