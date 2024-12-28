
// API routes for handling requests
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth')
const adminRoutes = require('./admin/admin')
const companyRoutes = require('./company/company')

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/company', companyRoutes);


module.exports = router;