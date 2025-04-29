const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');  // Ensure correct path

// POST route for signup
router.post('/signup', authController.signup);

// POST route for signin
router.post('/signin', authController.signin);

module.exports = router;
