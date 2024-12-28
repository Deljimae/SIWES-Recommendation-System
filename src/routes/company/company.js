// Company routes
const express = require('express');
const router = express.Router();

// AUTHENTICATION ROUTES
const signIn = require('../../controllers/company/auth/signIn');
const signUp = require('../../controllers/company/auth/signUp');

router.post('/login', signIn);
router.post('/register', signUp);

module.exports = router;