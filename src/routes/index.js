'use strict';

const { Router } = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
