// src/middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyEmail = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'code');
    req.user = decoded;
    const email = decoded.email;

    // Check if the email ends with '@gmail.com'
    if (email && email.endsWith('@gmail.com')) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden - Email does not end with @gmail.com' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const validateAppoint = (req, res, next) => {
  const { text } = req.body;

  // Check if the Appoint exceeds 140 characters
  if (text.length > 140) {
    return res.status(400).json({ error: 'Appoint text exceeds 140 characters' });
  }

  next();
};

module.exports = {
  verifyEmail,
  validateAppoint,
};
