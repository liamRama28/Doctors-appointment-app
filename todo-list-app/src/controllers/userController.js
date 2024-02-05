// src/controllers/userController.js

const User = require('../models/User'); // Make sure this points to your User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Controller function for user registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new User instance
    user = new User({ username, email, password });

    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create and send the JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: email === 'admin@gmail.com' }, 
      'black', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error in registration:', error.message);
    res.status(500).send('Server error');
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find a user in the database with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the user is an admin
    const isAdmin = email === 'admin@gmail.com';

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: email === 'admin@gmail.com' },
      'black', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user._id, isAdmin: isAdmin });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
