const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// All routes need authentication
router.use(verifyToken);

// Get current user profile
router.get("/profile", userController.getProfile);

// Update current user profile
router.put("/profile", userController.updateProfile);

module.exports = router;