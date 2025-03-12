// models/Habit.js
const { ObjectId } = require("mongodb");
const { connectDB, client } = require("../config/db");

// Make sure to connect before accessing the database
async function getDb() {
    await connectDB(); // Ensure DB is connected
    return client.db("habit_tracker");
}

async function createHabit(habitData) {
    const db = await getDb();
    const habitsCollection = db.collection("habits");
    return await habitsCollection.insertOne(habitData);
}

async function getHabits() {
    const db = await getDb();
    const habitsCollection = db.collection("habits");
    return await habitsCollection.find().toArray();
}

module.exports = { createHabit, getHabits };
