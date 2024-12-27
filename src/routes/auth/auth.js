
// Authentication routes
const express = require('express');
const router = express.Router();

const { signUp } = require('../../controllers/auth/signUp');

// Register route
router.post('/register', signUp);

// // Login route
// router.post('/login',);

module.exports = router;