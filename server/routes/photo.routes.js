const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// All routes need authentication
router.use(verifyToken);

// Upload a new photo with file upload
router.post("/", upload.single("file"), photoController.uploadPhoto);

// Get all photos (with optional album_id filter in query)
router.get("/", photoController.getAllPhotos);

// Get single photo by id
router.get("/:id", photoController.getPhotoById);

// Update a photo
router.put("/:id", photoController.updatePhoto);

// Delete a photo
router.delete("/:id", photoController.deletePhoto);

module.exports = router;