const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit"); // Assuming you have a Habit model

// Route to display all habits
router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find(); // Fetch habits from MongoDB
        res.render("habits", { habits }); // Pass habits to the template
    } catch (error) {
        res.status(500).send("Error fetching habits");
    }
});

// Route to add a new habit
router.post("/add", async (req, res) => {
    const { name, frequency } = req.body;
    try {
        const newHabit = new Habit({ name, frequency });
        await newHabit.save(); // Save the habit to MongoDB
        res.redirect("/habits"); // Redirect to habits page
    } catch (error) {
        res.status(500).send("Error saving habit");
    }
});

module.exports = router;
