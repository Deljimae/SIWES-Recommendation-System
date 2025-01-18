// Company routes
const express = require('express');
const authMiddleware = require('../../middlewares/authentication');
const updateProfile = require('../../controllers/users/updateProfile');
const getUserDetails = require('../../controllers/users/getDetails');
const router = express.Router();

router.get('/get-details', authMiddleware.verifyToken, getUserDetails)
router.put('/update-profile', authMiddleware.verifyToken, updateProfile);

module.exports = router;