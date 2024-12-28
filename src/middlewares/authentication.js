const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const authMiddleware = {
  // Middleware to verify JWT token
  verifyToken: (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return errorResponse(res, 'No token provided', 401);
      }

      // Check if it's a Bearer token
      if (!authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 'Invalid token format', 401);
      }

      // Extract the token
      const token = authHeader.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user info to request object
      req.user = decoded;

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponse(res, 'Token expired', 401);
      }
      return errorResponse(res, 'Invalid token', 401);
    }
  },

  // Middleware to check role authorization
  checkRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return errorResponse(res, 'Unauthorized', 401);
      }

      // Check if user is admin or regular user
      if (req.user.role === 'admin') {
        // Admin has access to everything
        return next();
      }

      const hasRole = roles.includes(req.user.role);
      if (!hasRole) {
        return errorResponse(res, 'Forbidden - Insufficient permissions', 403);
      }

      next();
    };
  },

  // Helper function to generate JWT token
  generateToken: (userData) => {
    return jwt.sign(
      userData,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        issuer: process.env.JWT_ISSUER || 'SiwesRecommendation'
      }
    );
  }
};

module.exports = authMiddleware;
