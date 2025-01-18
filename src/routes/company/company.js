// Company routes
const express = require('express');
const router = express.Router();

// AUTHENTICATION ROUTES
const signIn = require('../../controllers/company/auth/signIn');
const signUp = require('../../controllers/company/auth/signUp');
const getCompanyDetails = require('../../controllers/company/getDetails');

router.post('/login', signIn);
router.post('/register', signUp);

router.get('/:uuid', getCompanyDetails)

module.exports = router;