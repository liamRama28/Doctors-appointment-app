//src/controllers/appointController.js
const Appoint = require('../models/Appoint'); // Import the Appoint model


// Controller function to get all appointments
const list = async (req, res) => {
  try {
    // Fetch all appointments from the database
    const appoints = await Appoint.find();
    // Modify appoints to include additional fields
    const appointsWithDetails = appoints.map((appoint) => ({
      _id: appoint._id,
      title: appoint.title,
      description: appoint.description,
      doctor: appoint.doctor, // Add doctor field
      date: appoint.date, // Add date field
      timeSlot: appoint.timeSlot, // Add timeSlot field
    }));
    res.json(appointsWithDetails); // Return the appointments with additional details
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
};


// Controller function to create a new appointment
const create = async (req, res) => {
  try {
    // Extract appointment data from the request body
    const { title, description, doctor, date, timeSlot } = req.body;

    // Validate appointment text length
    if (title.length + description.length > 140) {
      return res.status(400).json({ error: 'Appointment text cannot exceed 140 characters' });
    }

      

    // Create a new Appoint instance with the provided data
    const appoint = new Appoint({ title, description, doctor, date, timeSlot});
    const savedAppoint = await appoint.save(); // Save the newly created appointment
    
    // Send a success message along with the created appointment
    res.status(201).json({ message: 'Your appointment was added', appointment: savedAppoint });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'An error occurred while creating the appointment' });
  }
};



// Controller function to update an appointment by ID
const update = async (req, res) => {
  try {
    // Extract appointment ID from the request parameters
    const { id } = req.params;
    // Extract updated appointment data from the request body
    const { title, description, doctor, date, timeSlot } = req.body;

    // Validate updated appointment text length
    if (title.length + description.length > 140) {
      return res.status(400).json({ error: 'Appointment text cannot exceed 140 characters' });
    }

    // Find and update the appointment with the provided ID
    const updatedAppoint = await Appoint.findByIdAndUpdate(id, { title, description, doctor, date, timeSlot }, { new: true });
    res.json(updatedAppoint); // Return the updated appointment
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
};

// Controller function to delete an appointment by ID
const remove = async (req, res) => {
  try {
    // Extract appointment ID from the request parameters
    const { id } = req.params;
    await Appoint.findByIdAndRemove(id); // Find and remove the appointment with the provided ID
    res.json({ message: 'Appointment deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
};

// Export the controller functions for use in the application
module.exports = {
  list,
  create,
  update,
  remove,
};
