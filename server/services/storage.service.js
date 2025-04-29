const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

/**
 * Upload file ke S3
 * @param {Object} file - File yang diupload
 * @param {String} folder - Folder tujuan di S3
 * @returns {Promise<String>} - URL file di S3
 */
const uploadFile = async (file, folder = 'uploads') => {
  try {
    // Baca file dari filesystem temporary
    const fileContent = fs.readFileSync(file.path);

    // Nama file di S3
    const fileName = `${folder}/${Date.now()}-${path.basename(file.filename)}`;

    // Parameter untuk S3 upload
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: 'public-read' // Set ACL untuk akses publik
    };

    // Upload file ke S3
    const uploadFile = async (file, folder = "uploads") => {
        try {
            const fileContent = fs.readFileSync(file.path);
            const fileName = `${folder}/${Date.now()}-${path.basename(file.filename)}`;
    
            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: fileName,
                Body: fileContent,
                ContentType: file.mimetype,
                ACL: "public-read"
            };
    
            const command = new PutObjectCommand(uploadParams);
            await s3.send(command);
    
            fs.unlinkSync(file.path);
            return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        } catch (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }
    };
    
    // Hapus file temporary
    fs.unlinkSync(file.path);
    
    return data.Location; // Return URL file di S3
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

/**
 * Hapus file dari S3
 * @param {String} fileUrl - URL file di S3
 * @returns {Promise<Boolean>} - Status sukses/gagal
 */
const deleteFile = async (fileUrl) => {
  try {
    // Extract key from URL
    const key = fileUrl.split(`${BUCKET_NAME}/`)[1];
    
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    const deleteFile = async (fileUrl) => {
        try {
            const key = fileUrl.split(`${BUCKET_NAME}/`)[1];
    
            const deleteParams = {
                Bucket: BUCKET_NAME,
                Key: key
            };
    
            const command = new DeleteObjectCommand(deleteParams);
            await s3.send(command);
            return true;
        } catch (error) {
            throw new Error(`Error deleting file: ${error.message}`);
        }
    };
    return true;
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

module.exports = {
  uploadFile,
  deleteFile
};