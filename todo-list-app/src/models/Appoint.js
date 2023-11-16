const mongoose = require('mongoose'); // Import the Mongoose library

// Define a Mongoose schema for appointments
const appointSchema = new mongoose.Schema({
  title: String, // Title of the appointment
  description: String, // Description of the appointment
  doctor: String, // Doctor associated with the appointment
  date: Date, // Date of the appointment
  timeSlot: String, // Time slot for the appointment

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
});

// Create a Mongoose model based on the schema, named 'Appoint'
const Appoint = mongoose.model('Appoint', appointSchema);

// Export the Appoint model to be used in other parts of the application
module.exports = Appoint;
