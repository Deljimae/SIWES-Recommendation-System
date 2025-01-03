
// API routes for handling requests
const express = require('express');;
const router = express.Router();
const authRoutes = require('./auth/auth');
const adminRoutes = require('./admin/admin');
const companyRoutes = require('./company/company');
const usersRoutes = require('./users/users');
const generateRecommendationsForUser = require('../controllers/recommendationController');
const { verifyToken } = require('../middlewares/authentication');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/company', companyRoutes);

router.use('/user', usersRoutes);
router.get('/recommendations', verifyToken, generateRecommendationsForUser);

module.exports = router;