// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

const connectDB = async () => {
    try {
        if (!db) {
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
