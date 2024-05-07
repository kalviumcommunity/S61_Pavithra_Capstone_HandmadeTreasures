const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const route = require('./routes');
const userRoute=require('./User/userRoutes');

connectDB();
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Handcrafted World",
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    })
});

app.use('/api', route);
app.use('/admin',userRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});