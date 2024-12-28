
// Authentication routes
const express = require('express');
const router = express.Router();

const { signUp } = require('../../controllers/auth/signUp');
const signIn = require('../../controllers/auth/signIn');

// Register route
router.post('/register', signUp);

// // Login route
router.post('/login', signIn);

module.exports = router;