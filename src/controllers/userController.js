'use strict';

const UserModel = require('../models/userModel');

/**
 * GET /users
 * Returns the list of all users (protected – requires valid JWT).
 */
const getAllUsers = (req, res, next) => {
  try {
    const users = UserModel.findAll();
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /users/me
 * Returns the profile of the currently authenticated user.
 */
const getMe = (req, res, next) => {
  try {
    const user = UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const { passwordHash: _omit, ...publicUser } = user;
    return res.status(200).json({ success: true, data: publicUser });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getMe };
