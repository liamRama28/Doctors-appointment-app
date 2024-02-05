const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const userRoutes = require('./src/routes/userRoutes');
const appointRoutes = require('./src/routes/appointRoutes');
const authMiddleware = require('./src/middleware/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// User routes (registration and login)
app.use('/api/users', userRoutes);

// Define routes
app.use('/api/tasks', appointRoutes); // Use the appoint routes for /api/appoints

module.exports = app; // Export the app for testing
