const jwt = require('jsonwebtoken');

const authMiddleware = {
  // Middleware to verify JWT token
  verifyToken: (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Check if it's a Bearer token
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
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
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  // Middleware to check role authorization
  checkRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Check if user is admin or regular user
      if (req.user.role === 'admin') {
        // Admin has access to everything
        return next();
      }

      const hasRole = roles.includes(req.user.role);
      if (!hasRole) {
        return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
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
