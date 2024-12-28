// Company routes
const express = require('express');
const authMiddleware = require('../../middlewares/authentication');
const updateProfile = require('../../controllers/users/updateProfile');
const router = express.Router();

router.put('/update-profile', authMiddleware.verifyToken, updateProfile);

module.exports = router;