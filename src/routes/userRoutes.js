'use strict';

const { Router } = require('express');
const { getAllUsers, getMe } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

// All routes below require a valid JWT.
router.use(authMiddleware);

/**
 * @route  GET /users/me
 * @desc   Get current authenticated user profile
 * @access Private
 */
router.get('/me', getMe);

/**
 * @route  GET /users
 * @desc   Get all users
 * @access Private
 */
router.get('/', getAllUsers);

module.exports = router;
