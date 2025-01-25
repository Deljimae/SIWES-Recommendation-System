// Company routes
const express = require('express');
const authMiddleware = require('../../middlewares/authentication');
const updateProfile = require('../../controllers/users/updateProfile');
const getUserDetails = require('../../controllers/users/getDetails');
const { submitApplication, getApplications, deleteApplication } = require('../../controllers/users/submitApplication');
const router = express.Router();

router.get('/get-details', authMiddleware.verifyToken, getUserDetails);
router.put('/update-profile', authMiddleware.verifyToken, updateProfile);

router.post('/submit-application', authMiddleware.verifyToken, submitApplication);
router.get('/get-applications', authMiddleware.verifyToken, getApplications);
router.delete('/delete-application/:id', authMiddleware.verifyToken, deleteApplication);

module.exports = router;