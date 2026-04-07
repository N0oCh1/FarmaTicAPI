'use strict';

/**
 * Database configuration placeholder.
 * Replace this module with your preferred database adapter
 * (e.g. Mongoose for MongoDB, Sequelize for SQL databases).
 *
 * The connect() function is called during app start-up (see server.js).
 */

const connectDB = async () => {
  // TODO: Replace with your database connection logic.
  // Example for MongoDB using Mongoose:
  //
  // const mongoose = require('mongoose');
  // await mongoose.connect(process.env.DB_URI);
  // console.log('MongoDB connected');

  console.log('Database connection placeholder – configure in src/config/database.js');
};

module.exports = connectDB;
