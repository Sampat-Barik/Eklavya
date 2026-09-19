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
 * This middleware ensures the user is an admin or has an admin-level role.
 * It must be placed AFTER the `protect` middleware.
 */
export const admin = (req, res, next) => {
  if (!req.user || req.user.isSuspended) {
    return res.status(403).json({ message: 'Account is suspended or invalid' });
  }

  const adminRoles = [
    'events_manager',
    'content_manager',
    'team_manager',
    'education_manager',
    'communications_manager',
    'finance_manager',
    'admin',
    'super_admin'
  ];

  if (req.user.isAdmin || adminRoles.includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

/**
 * Middleware to check if user has one of the specified roles
 */
export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || req.user.isSuspended) {
      return res.status(403).json({ message: 'Access denied: User account is suspended or invalid' });
    }

    if (req.user.role === 'super_admin' || allowedRoles.includes(req.user.role)) {
      return next();
    }

    res.status(403).json({ message: `Access denied: Requires role [${allowedRoles.join(', ')}]` });
  };
};

/**
 * Middleware to check if user has permission for a specific module
 */
export const checkModulePermission = (moduleKey) => {
  return (req, res, next) => {
    if (!req.user || req.user.isSuspended) {
      return res.status(403).json({ message: 'Access denied: User account is suspended or invalid' });
    }

    // super_admin and admin have access to all modules
    if (req.user.role === 'super_admin' || req.user.role === 'admin' || req.user.isAdmin) {
      return next();
    }

    // Check specific module permissions
    if (Array.isArray(req.user.permissions) && req.user.permissions.includes(moduleKey)) {
      return next();
    }

    res.status(403).json({ message: `Access denied: Missing module permission [${moduleKey}]` });
  };
};
