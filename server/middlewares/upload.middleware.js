const multer = require("multer");
const path = require("path");
const fs = require('fs').promises;

// Definisi konfigurasi upload yang aman dan fleksibel
const UPLOAD_CONFIG = {
  // Direktori upload dengan fallback yang aman
  TEMP_DIR: path.join(process.cwd(), 'uploads', 'temp'),
  
  // Batasan ukuran file (5MB default)
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  
  // Tipe MIME yang diizinkan dengan validasi ketat
  ALLOWED_MIME_TYPES: [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'image/webp', 
    'image/bmp'
  ]
};

// Fungsi utilitas untuk validasi direktori upload
const ensureUploadDirectory = async () => {
  try {
    // Buat direktori secara rekursif jika belum ada
    await fs.mkdir(UPLOAD_CONFIG.TEMP_DIR, { recursive: true });
    console.log(`[UPLOAD] Direktori upload dibuat: ${UPLOAD_CONFIG.TEMP_DIR}`);
    
    // Validasi izin tulis
    await fs.access(UPLOAD_CONFIG.TEMP_DIR, fs.constants.W_OK);
  } catch (error) {
    console.error(`[UPLOAD ERROR] Gagal mempersiapkan direktori upload: ${error.message}`);
    throw new Error('Konfigurasi direktori upload tidak valid');
  }
};

// Panggil fungsi ensure directory saat modul dimuat
ensureUploadDirectory().catch(console.error);

// Konfigurasi penyimpanan file dengan strategi penamaan unik
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // Log informasi file yang masuk
      console.log('[UPLOAD DEBUG] Informasi File:', {
        originalname: file.originalname,
        mimetype: file.mimetype
      });

      // Pastikan direktori tersedia
      await ensureUploadDirectory();
      cb(null, UPLOAD_CONFIG.TEMP_DIR);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    // Pembangkit nama file unik dengan sanitasi
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // Sanitasi nama file untuk menghindari karakter berbahaya
    const sanitizedFileName = file.originalname
      .replace(/[^a-zA-Z0-9.]/g, '_')
      .toLowerCase();
    
    // Konstruksi nama file dengan format yang aman
    const fileName = `${file.fieldname}-${uniqueSuffix}${path.extname(sanitizedFileName)}`;
    
    console.log('[UPLOAD DEBUG] Nama File Generate:', fileName);
    cb(null, fileName);
  }
});

// Filter tipe file dengan validasi komprehensif
const fileFilter = (req, file, cb) => {
  // Validasi tipe MIME dengan pendekatan whitelist
  const isAllowedMimeType = UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype);
  
  if (isAllowedMimeType) {
    console.log(`[UPLOAD] Tipe file diizinkan: ${file.mimetype}`);
    cb(null, true);
  } else {
    console.warn(`[UPLOAD WARNING] Tipe file ditolak: ${file.mimetype}`);
    cb(new Error('Tipe file tidak diizinkan. Hanya gambar yang diperbolehkan.'), false);
  }
};

// Konfigurasi Multer dengan parameter keamanan tinggi
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    // Batasan ukuran file
    fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
    
    // Batasan jumlah file per request
    files: 1
  }
});

// Middleware error handling khusus
upload.errorHandler = (err, req, res, next) => {
  console.error('[UPLOAD MIDDLEWARE ERROR]:', err);

  if (err instanceof multer.MulterError) {
    switch(err.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({ 
          error: 'Ukuran file terlalu besar',
          maxSize: `${UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024)} MB`
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({ 
          error: 'Terlalu banyak file atau nama field salah' 
        });
      default:
        return res.status(400).json({ error: 'Kesalahan upload file' });
    }
  } else if (err) {
    return res.status(400).json({ 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
  
  next();
};

// Ekspor konfigurasi upload dengan fitur tambahan
module.exports = upload;