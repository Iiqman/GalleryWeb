const express = require("express");
const router = express.Router();
const preferenceController = require("../controllers/preference.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// All routes need authentication
router.use(verifyToken);

// Get user preference
router.get("/", preferenceController.getPreference);

// Update user preference
router.put("/", preferenceController.updatePreference);

module.exports = router;