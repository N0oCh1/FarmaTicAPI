'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/database');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// ─── Database connection ────────────────────────────────────────────────────
connectDB();

// ─── Global middleware ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// Health-check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler – must be placed after all routes
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Centralised error handler ────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
