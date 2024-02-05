// src/routes/appointRoutes.js
const express = require('express');
const router = express.Router();
const appointController = require('../controllers/appointController');
const { verifyToken } = require('../middleware/auth'); // Import verifyToken

// Route to get a list of appointments, protected by verifyToken middleware
router.get('/list', verifyToken, appointController.list);

// Route to create a new appointment, protected by verifyToken middleware
router.post('/create', verifyToken, appointController.create);

// Route to update an appointment by ID, protected by verifyToken middleware
router.put('/edit/:id', verifyToken, appointController.update);

// Route to delete an appointment by ID, protected by verifyToken middleware
router.delete('/delete/:id', verifyToken, appointController.remove);

module.exports = router;
