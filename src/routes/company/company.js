// Company routes
const express = require('express');
const router = express.Router();

// AUTHENTICATION ROUTES
const signIn = require('../../controllers/company/auth/signIn');
const signUp = require('../../controllers/company/auth/signUp');
const getCompanyDetails = require('../../controllers/company/getDetails');
const authMiddleware = require('../../middlewares/authentication');
const { getCompanyApplications } = require('../../controllers/company/Applications')

router.post('/login', signIn);
router.post('/register', signUp);

router.get('/applications', authMiddleware.verifyToken, getCompanyApplications);
router.get('/:uuid', getCompanyDetails)

module.exports = router;