import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * This middleware checks if a request contains a valid JWT in the Authorization header.
 * If valid, it attaches the user document to the request object (`req.user`) so that
 * subsequent route handlers can access it.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer '
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (format is "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID (which was embedded in the token)
      // We use .select('-password') to exclude the password field from the result
      req.user = await User.findById(decoded.id).select('-password');

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

/**
 * This middleware ensures the user is an admin.
 * It must be placed AFTER the `protect` middleware, because it relies on `req.user` being set.
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
