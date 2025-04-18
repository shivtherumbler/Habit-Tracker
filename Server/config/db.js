const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI); // Remove deprecated options

let db;

const connectDB = async () => {
    try {
        if (!db) {
            console.log('Attempting to connect to MongoDB...');
            await client.connect();
            db = client.db('habit_tracker');
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const getDb = () => db;

module.exports = { connectDB, getDb, client };