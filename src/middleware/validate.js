'use strict';

const { validationResult } = require('express-validator');

/**
 * Middleware that reads express-validator results and short-circuits
 * the request with a 422 response if there are validation errors.
 *
 * Usage: place after your express-validator chain rules in a route.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = validate;
