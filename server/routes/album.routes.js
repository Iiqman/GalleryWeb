const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// All routes need authentication
router.use(verifyToken);

// Create a new album
router.post("/", albumController.createAlbum);

// Get all albums for current user
router.get("/", albumController.getAllAlbums);

// Get single album by id
router.get("/:id", albumController.getAlbumById);

// Update an album
router.put("/:id", albumController.updateAlbum);

// Delete an album
router.delete("/:id", albumController.deleteAlbum);

module.exports = router;