require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // Load from .env file
const client = new MongoClient(uri);

async function connectDB() {
    try {
        console.log("⏳ Trying to connect to MongoDB...");
        await client.connect();
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

module.exports = { client, connectDB };

