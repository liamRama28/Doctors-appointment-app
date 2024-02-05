// src/controllers/appointController.js
const Appoint = require('../models/Appoint');
const jwt = require('jsonwebtoken');

// Controller function to list appointments
const list = async (req, res) => {
  try {
    let appoints;
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, 'black'); 

    if (decoded.isAdmin) { // Check if the user is an admin
      appoints = await Appoint.find().populate('userId', 'username');
    } else {
      appoints = await Appoint.find({ userId: decoded.userId });
    }

    res.json(appoints);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
};

// Controller function to create a new appointment
const create = async (req, res) => {
  try {
    const { title, description, doctor, date, timeSlot } = req.body;
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, 'black'); 
    const userId = decoded.userId;

    const appoint = new Appoint({ title, description, doctor, date, timeSlot, userId });
    const savedAppoint = await appoint.save();
    
    res.status(201).json({ message: 'Your appointment was added', appointment: savedAppoint });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'An error occurred while creating the appointment' });
  }
};

// Controller function to update an appointment by ID
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, doctor, date, timeSlot } = req.body;

    const updatedAppoint = await Appoint.findByIdAndUpdate(
      id,
      { title, description, doctor, date, timeSlot },
      { new: true }
    );

    res.json(updatedAppoint);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
};

// Controller function to delete an appointment by ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Appoint.findByIdAndRemove(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
};

module.exports = {
  list,
  create,
  update,
  remove,
};
