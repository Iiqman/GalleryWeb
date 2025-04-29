const db = require("../models");
const Album = db.albums;
const Photo = db.photos;

exports.createAlbum = async (req, res) => {
  try {
    // Validasi input
    if (!req.body.name) {
      return res.status(400).send({
        message: "Album name is required!"
      });
    }

    // Buat album
    const album = await Album.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.userId
    });

    res.status(201).send(album);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the album."
    });
  }
};

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({
      where: { user_id: req.userId },
      include: [{
        model: Photo,
        as: "photos",
        attributes: ["id", "file_path", "created_at"],
        limit: 1, // Untuk preview album (hanya ambil 1 foto)
      }]
    });

    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving albums."
    });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const id = req.params.id;
    
    const album = await Album.findOne({
      where: { 
        id: id,
        user_id: req.userId 
      },
      include: [{
        model: Photo,
        as: "photos"
      }]
    });

    if (!album) {
      return res.status(404).send({
        message: `Album with id=${id} not found or you don't have access.`
      });
    }

    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving album."
    });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const id = req.params.id;

    // Validasi input
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    // Update album
    const numUpdated = await Album.update(req.body, {
      where: { 
        id: id,
        user_id: req.userId 
      }
    });

    if (numUpdated[0] === 0) {
      return res.status(404).send({
        message: `Album with id=${id} not found, no changes made, or you don't have access.`
      });
    }

    res.status(200).send({
      message: "Album updated successfully."
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating album."
    });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete album (cascade delete will remove associated photos)
    const numDeleted = await Album.destroy({
      where: { 
        id: id,
        user_id: req.userId 
      }
    });

    if (numDeleted === 0) {
      return res.status(404).send({
        message: `Album with id=${id} not found or you don't have access.`
      });
    }

    res.status(200).send({
      message: "Album deleted successfully!"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting album."
    });
  }
};