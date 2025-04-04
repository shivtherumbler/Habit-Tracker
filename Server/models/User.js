const { getDb } = require('../config/db');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const createUser = async (userData) => {
    const db = getDb();
    const usersCollection = db.collection('users');

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password
    const newUser = { username: userData.username, password: hashedPassword };

    return await usersCollection.insertOne(newUser);
};

const findUserByUsername = async (username) => {
    const db = getDb();
    const usersCollection = db.collection('users');
    return await usersCollection.findOne({ username });
};

const findUserById = async (id) => {
    const db = getDb();
    const usersCollection = db.collection('users');
    return await usersCollection.findOne({ _id: new ObjectId(id) });
};

module.exports = { createUser, findUserByUsername, findUserById };