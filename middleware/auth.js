const jwt = require('jsonwebtoken');
const User = require('../Model/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token received:', token); // <-- Add this

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded token:', decoded); // <-- Add this

      // Attach user to request
      req.user = await User.findById(decoded.userId || decoded.id).select('-password'); // <-- Use userId if present
      console.log('User found:', req.user ? req.user._id : 'No user found'); // <-- Add this

      if (!req.user) {
        return res.status(401).json({ message: 'User not found for this token.' });
      }

      next(); // Proceed to getProfile
    } catch (error) {
      console.error('JWT Verification Error:', error.message); // <-- CRITICAL: Log the specific JWT error
      return res.status(401).json({ message: 'Not authorized, token invalid or expired.' });
    }
  } else {
    console.log('No Authorization header or not Bearer format.'); // <-- Add this
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }

  if (!token) { // This part might be redundant if the initial if-else handles it
    return res.status(401).json({ message: 'Not authorized, token missing.' });
  }
};
