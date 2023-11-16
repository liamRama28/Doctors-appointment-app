const express = require('express'); // Import the Express framework
const appointController = require('../controllers/appointController'); // Import the controller for appointments
const router = express.Router(); // Create an instance of an Express router

// Route to get a list of appointments
router.get('/list', appointController.list);




// Route to create a new appointment
router.post('/create', appointController.create);

// Route to delete an appointment by ID
router.delete('/delete/:id', appointController.remove);

// Route to update an appointment by ID
router.put('/edit/:id', appointController.update);

// Export the router to be used in other parts of the application
module.exports = router;
