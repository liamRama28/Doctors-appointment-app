// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const verified = jwt.verify(token, 'black'); 
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.email.endsWith('@gmail.com')) {
      return res.status(403).json({ error: 'Forbidden - Email does not end with @gmail.com' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while verifying the email' });
  }
};

module.exports = {
  verifyToken,
  verifyEmail
};
