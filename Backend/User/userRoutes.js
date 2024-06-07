const express = require("express");
const userRoute = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const UserModel = require('../User/userSchema');

// Joi schema for user signup
const signupSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

// Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

// Route for user signup
userRoute.post('/Signup', async (req, res) => {
    try {
        // Validate request body
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { userName, email, password } = req.body;
        const newUser = await UserModel.create({ userName, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for user login
userRoute.post('/login', async (req, res) => {
    try {
        // Validate request body
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Logout route (no validation needed)
userRoute.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = userRoute;
