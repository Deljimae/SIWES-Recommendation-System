// Authentication routes
const express = require('express');
const router = express.Router();

const { signIn } = require('../../controllers/auth/admin/auth');

router.post('/login', signIn);

module.exports = router;