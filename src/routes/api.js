
// API routes for handling requests
const express = require('express');;
const router = express.Router();
const authRoutes = require('./auth/auth');
const adminRoutes = require('./admin/admin');
const companyRoutes = require('./company/company');
const usersRoutes = require('./users/users');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/company', companyRoutes);

router.use('/user', usersRoutes)

module.exports = router;