'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const UserModel = require('../models/userModel');

/**
 * Validation rules for the register endpoint.
 */
const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().normalizeEmail().withMessage('A valid email is required.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

/**
 * Validation rules for the login endpoint.
 */
const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('A valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

/**
 * POST /auth/register
 * Creates a new user account and returns a JWT.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (UserModel.findByEmail(email)) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = UserModel.create({ name, email, passwordHash });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/login
 * Authenticates an existing user and returns a JWT.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userRecord = UserModel.findByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, userRecord.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: userRecord.id, email: userRecord.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    );

    const { passwordHash: _omit, ...user } = userRecord;

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, registerRules, loginRules };
