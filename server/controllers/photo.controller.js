const db = require("../models");
const Photo = db.photos;
const Album = db.albums;
const path = require('path');
const fs = require('fs').promises;
const ImageCompressionService = require('../services/image-compression.service');

exports.uploadPhoto = async (req, res) => {
  try {
    // Validasi file
    if (!req.file) {
      return res.status(400).send({
        message: "Please upload a file!"
      });
    }

    // Validasi album (jika ada)
    if (req.body.album_id) {
      const album = await Album.findOne({
        where: {
          id: req.body.album_id,
          user_id: req.userId
        }
      });

      if (!album) {
        // Hapus file temporary jika album tidak valid
        await fs.unlink(req.file.path);
        return res.status(404).send({
          message: "Album not found or you don't have access."
        });
      }
    }

    // Kompresi gambar dengan konfigurasi lokal
    const compressionResult = await ImageCompressionService.compressImage(req.file.path, {
      maxWidth: 1920,    // Lebar maksimal HD
      maxHeight: 1080,   // Tinggi maksimal HD
      quality: 80,       // Kualitas kompresi
      format: 'webp',    // Format modern dengan kompresi optimal
      outputDir: path.join(__dirname, '../uploads/compressed')
    });

    // Simpan path file yang telah dikompresi (path relatif)
    const compressedFilePath = path.relative(
      path.join(__dirname, '..'), 
      compressionResult.compressedFile
    );

    // Simpan data foto ke database dengan metadata kompresi
    const photo = await Photo.create({
      file_path: compressedFilePath,
      description: req.body.description,
      album_id: req.body.album_id,
      user_id: req.userId,
      // Tambahan metadata kompresi
      original_size: compressionResult.originalSize,
      compressed_size: compressionResult.compressedSize,
      width: compressionResult.width,
      height: compressionResult.height
    });

    res.status(201).send({
      photo: photo,
      compression: {
        originalSize: compressionResult.originalSize,
        compressedSize: compressionResult.compressedSize,
        compressionRatio: compressionResult.compressionRatio,
        format: 'webp'
      }
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).send({
      message: error.message || "Some error occurred while uploading the photo.",
      // Tambahkan detail error untuk mode pengembangan
      ...(process.env.NODE_ENV === 'development' && { errorDetails: error.stack })
    });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    // Filter berdasarkan album jika parameter ada
    const condition = {
      user_id: req.userId
    };

    if (req.query.album_id) {
      condition.album_id = req.query.album_id;
    }

    const photos = await Photo.findAll({
      where: condition,
      include: [{
        model: Album,
        as: "album",
        attributes: ["id", "name"]
      }],
      // Tambahkan pengurutan berdasarkan tanggal terbaru
      order: [['created_at', 'DESC']]
    });

    res.status(200).send(photos);
  } catch (error) {
    console.error('Error retrieving photos:', error);
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving photos."
    });
  }
};

exports.getPhotoById = async (req, res) => {
  try {
    const id = req.params.id;
    
    const photo = await Photo.findOne({
      where: { 
        id: id,
        user_id: req.userId 
      },
      include: [{
        model: Album,
        as: "album",
        attributes: ["id", "name"]
      }]
    });

    if (!photo) {
      return res.status(404).send({
        message: `Photo with id=${id} not found or you don't have access.`
      });
    }

    res.status(200).send(photo);
  } catch (error) {
    console.error('Error retrieving photo:', error);
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving photo."
    });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const id = req.params.id;

    // Validasi input
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    // Validasi album jika ingin diubah
    if (req.body.album_id) {
      const album = await Album.findOne({
        where: {
          id: req.body.album_id,
          user_id: req.userId
        }
      });

      if (!album) {
        return res.status(404).send({
          message: "Album not found or you don't have access."
        });
      }
    }

    // Update foto
    const numUpdated = await Photo.update(req.body, {
      where: { 
        id: id,
        user_id: req.userId 
      }
    });

    if (numUpdated[0] === 0) {
      return res.status(404).send({
        message: `Photo with id=${id} not found, no changes made, or you don't have access.`
      });
    }

    // Ambil foto yang baru diupdate untuk dikembalikan
    const updatedPhoto = await Photo.findOne({
      where: { 
        id: id,
        user_id: req.userId 
      }
    });

    res.status(200).send({
      message: "Photo updated successfully.",
      photo: updatedPhoto
    });
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).send({
      message: error.message || "Some error occurred while updating photo."
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const id = req.params.id;

    // Ambil data foto terlebih dahulu untuk mendapatkan path file
    const photo = await Photo.findOne({
      where: { 
        id: id,
        user_id: req.userId 
      }
    });

    if (!photo) {
      return res.status(404).send({
        message: `Photo with id=${id} not found or you don't have access.`
      });
    }

    // Hapus file dari sistem lokal
    try {
      await fs.unlink(path.join(__dirname, '..', photo.file_path));
    } catch (fileError) {
      // Log error penghapusan file tanpa menghentikan proses
      console.warn(`Gagal menghapus file: ${fileError.message}`);
    }

    // Hapus dari database
    await photo.destroy();

    res.status(200).send({
      message: "Photo deleted successfully!",
      deletedPhotoId: id
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).send({
      message: error.message || "Some error occurred while deleting photo."
    });
  }
};