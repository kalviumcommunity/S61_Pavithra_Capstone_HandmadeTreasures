const express = require("express");
const userRoute = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const UserModel = require('../User/userSchema');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretkey = process.env.JWT_SECRET;

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Joi schema for user signup
const signupSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    profilePicture: Joi.string()
});

// Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

// Route for user signup
userRoute.post('/signup', upload.single('profilePicture'), async (req, res) => {

    try {
        // Validate request body
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            userName,
            email,
            password: hashedPassword,
            profilePicture: req.file ? req.file.path : null
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Error signing up user' });
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
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, secretkey, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", token: token }); // Include token in response body
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Logout route (no validation needed)
userRoute.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = userRoute;
