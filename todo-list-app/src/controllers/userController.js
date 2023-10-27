const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JSON Web Token library
const bcrypt = require('bcrypt'); // Import bcrypt library for password hashing
const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// Controller function for user registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email ends with '@gmail.com'
    if (!email.endsWith('@gmail.com')) {
      return res.status(403).json({ error: 'Email must end with @gmail.com' });
    }

    // Create a new User instance with the provided data
    const user = new User({ username, email, password });
    await user.save(); // Save the user to the database

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id }, 'word', {
      expiresIn: '7d', // Token expiration time (7 days)
    });

    res.json({ token }); // Return the JWT as a response
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find a user in the database with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id }, 'word', {
      expiresIn: '7d',
    });

    res.json({ token }); // Return the JWT as a response
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

