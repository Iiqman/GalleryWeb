const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware Keamanan
app.use(helmet());

// Middleware Kompresi Respons
app.use(compression());

// Middleware untuk CORS dengan konfigurasi ketat
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middleware untuk parsing request
app.use(express.json({
  limit: '10mb'  // Batasi ukuran payload
}));
app.use(express.urlencoded({ 
  extended: true,
  limit: '10mb'
}));

// Konfigurasi direktori statis untuk upload
const UPLOAD_DIRS = [
  '/tmp/uploads',
  path.join(__dirname, 'uploads', 'temp'),
  path.join(__dirname, 'uploads', 'compressed')
];

UPLOAD_DIRS.forEach(dir => {
  app.use(`/${path.basename(dir)}`, express.static(dir, {
    setHeaders: (res, filePath) => {
      // Kontrol cache untuk file upload
      if (path.extname(filePath).match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
        res.set('Cache-Control', 'public, max-age=86400'); // Cache gambar selama 1 hari
      }
    }
  }));
});

// Middleware Logging Kustom (Opsional)
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log request untuk debugging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Modifikasi res.send untuk logging response
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log(`[RESPONSE] Status: ${res.statusCode}, Duration: ${duration}ms`);
    originalSend.call(this, body);
  };
  
  next();
});

// Registrasi Rute
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/albums', require('./routes/album.routes'));
app.use('/api/photos', require('./routes/photo.routes'));
app.use('/api/preferences', require('./routes/preference.routes'));

// Middleware Penanganan Error Global
const { notFound, errorHandler } = require('./middlewares/error.middleware');
app.use(notFound);
app.use(errorHandler);

module.exports = app;