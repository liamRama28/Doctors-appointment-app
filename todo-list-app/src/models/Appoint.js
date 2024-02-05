// src/models/Appoint.js
const mongoose = require('mongoose');

const appointSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  // Adding a reference to the user model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Appoint = mongoose.model('Appoint', appointSchema);

module.exports = Appoint;
