const express = require("express");
const userRoute = express.Router();
const UserModel = require('../User/userSchema');

userRoute.post('/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await UserModel.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(400).json({ message: "Login successful" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
userRoute.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }

})
module.exports = userRoute;