const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const route = require('./routes');
const userRoute = require('./User/userRoutes');
const bodyParser = require('body-parser');
// const adminModel = require('./Admin/adminSchema');
const adminRoutes = require('./Admin/adminRoutes');
const bcrypt =require('bcrypt');

connectDB();
const port = 3000;

const app = express();

// Middleware to set COOP and COEP headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Handcrafted World",
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    })
});

app.use('/api', route);
app.use('/admin', userRoute);
app.use('/api/admin', adminRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});