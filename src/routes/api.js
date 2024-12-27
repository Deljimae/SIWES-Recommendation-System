
// API routes for handling requests
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth')

router.use('/auth', authRoutes);


module.exports = router;