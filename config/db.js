const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected to the database");
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
}
module.exports = connectDB;