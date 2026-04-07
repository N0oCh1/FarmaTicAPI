'use strict';

const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { register, login, registerRules, loginRules } = require('../controllers/authController');
const validate = require('../middleware/validate');

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

/**
 * @route  POST /auth/register
 * @desc   Register a new user
 * @access Public
 */
router.post('/register', authLimiter, registerRules, validate, register);

/**
 * @route  POST /auth/login
 * @desc   Authenticate user and return JWT
 * @access Public
 */
router.post('/login', authLimiter, loginRules, validate, login);

module.exports = router;
