const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

class ImageCompressionService {
  /**
   * Konfigurasi default untuk kompresi gambar
   * Memungkinkan fleksibilitas dan kontrol presisi
   */
  static DEFAULT_CONFIG = {
    // Resolusi maksimal untuk mencegah pembesaran berlebihan
    maxWidth: 1920,   // Standar HD
    maxHeight: 1080,  // Standar HD
    
    // Kontrol kualitas kompresi
    quality: 80,      // Kompresi bermutu tinggi
    
    // Format keluaran modern dengan kompresi efisien
    format: 'webp',   
    
    // Direktori default untuk file terkompresi
    outputDir: path.join(process.cwd(), 'uploads', 'compressed')
  };

  /**
   * Kompresi gambar dengan algoritma adaptif
   * 
   * @param {string} inputPath - Path file input
   * @param {Object} options - Konfigurasi kompresi khusus
   * @returns {Promise<Object>} Metadata file terkompresi
   */
  static async compressImage(inputPath, options = {}) {
    // Gabungkan konfigurasi default dengan opsi kustom
    const config = { ...this.DEFAULT_CONFIG, ...options };

    try {
      // Validasi keberadaan file input
      await fs.access(inputPath, fs.constants.R_OK);

      // Pastikan direktori output tersedia
      await fs.mkdir(config.outputDir, { recursive: true });

      // Ekstraksi metadata gambar asli
      const metadata = await sharp(inputPath).metadata();

      // Hitung faktor scaling adaptif
      const scaleFactor = this._calculateScaleFactor(
        metadata.width, 
        metadata.height, 
        config.maxWidth, 
        config.maxHeight
      );

      // Nama file keluaran unik
      const outputFileName = this._generateUniqueFileName(
        inputPath, 
        config.format
      );
      const outputPath = path.join(config.outputDir, outputFileName);

      // Proses kompresi dengan Sharp - strategi multi-resolusi
      const compressionResult = await sharp(inputPath)
        .resize({
          width: Math.round(metadata.width * scaleFactor),
          height: Math.round(metadata.height * scaleFactor),
          fit: 'inside',        // Pertahankan aspek rasio
          withoutEnlargement: true  // Cegah pembesaran
        })
        .toFormat(config.format, { 
          quality: config.quality,
          // Kompresi lossless untuk detail penting
          lossless: config.quality > 90
        })
        .toFile(outputPath);

      // Ambil statistik file terkompresi
      const compressedStats = await fs.stat(outputPath);

      // Hapus file input (opsional)
      await fs.unlink(inputPath);

      // Kembalikan metadata komprehensif
      return {
        originalFile: inputPath,
        compressedFile: outputPath,
        originalSize: metadata.size || 0,
        compressedSize: compressedStats.size,
        width: compressionResult.width,
        height: compressionResult.height,
        compressionRatio: this._calculateCompressionRatio(
          metadata.size || 0, 
          compressedStats.size
        ),
        format: config.format
      };
    } catch (error) {
      // Penanganan error terperinci
      console.error('Kompresi Gambar Gagal:', error);
      
      // Pastikan file input tidak tertinggal jika terjadi error
      await this._cleanupTemporaryFile(inputPath);

      throw new Error(`Kompresi Gambar Gagal: ${error.message}`);
    }
  }

  /**
   * Hitung faktor scaling untuk menjaga proporsionalitas gambar
   * 
   * @param {number} originalWidth 
   * @param {number} originalHeight 
   * @param {number} maxWidth 
   * @param {number} maxHeight 
   * @returns {number} Faktor scaling
   */
  static _calculateScaleFactor(
    originalWidth, 
    originalHeight, 
    maxWidth, 
    maxHeight
  ) {
    return Math.min(
      maxWidth / originalWidth,
      maxHeight / originalHeight,
      1  // Cegah pembesaran gambar
    );
  }

  /**
   * Hasilkan nama file unik dengan sanitasi
   * 
   * @param {string} originalPath 
   * @param {string} format 
   * @returns {string} Nama file unik
   */
  static _generateUniqueFileName(originalPath, format) {
    const parsedPath = path.parse(originalPath);
    const timestamp = Date.now();
    
    // Sanitasi nama file
    const sanitizedName = parsedPath.name
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    return `${sanitizedName}-${timestamp}.${format}`;
  }

  /**
   * Hitung rasio kompresi
   * 
   * @param {number} originalSize 
   * @param {number} compressedSize 
   * @returns {string} Persentase kompresi
   */
  static _calculateCompressionRatio(originalSize, compressedSize) {
    // Hindari pembagian dengan nol
    if (originalSize === 0) return '0%';
    
    const ratio = (compressedSize / originalSize) * 100;
    return `${ratio.toFixed(2)}%`;
  }

  /**
   * Kompresi batch gambar dengan kontrol paralel
   * 
   * @param {string[]} filePaths - Daftar path file
   * @param {Object} [options={}] - Konfigurasi kompresi
   * @returns {Promise<Object[]>} Hasil kompresi
   */
  static async compressBatch(filePaths, options = {}) {
    // Batasi jumlah proses simultan untuk mencegah overhead
    const MAX_CONCURRENT_PROCESSES = 3;

    // Kompresi gambar secara berurutan dengan batasan
    const results = [];
    for (let i = 0; i < filePaths.length; i += MAX_CONCURRENT_PROCESSES) {
      const batch = filePaths.slice(i, i + MAX_CONCURRENT_PROCESSES);
      
      // Proses batch dengan Promise.all untuk konkurensi terbatas
      const batchResults = await Promise.all(
        batch.map(async (filePath) => {
          try {
            return await this.compressImage(filePath, options);
          } catch (error) {
            console.error(`Kompresi gagal untuk ${filePath}:`, error);
            return {
              originalFile: filePath,
              error: error.message
            };
          }
        })
      );

      results.push(...batchResults);
    }

    return results;
  }

  /**
   * Pembersihan file temporary dengan penanganan error
   * 
   * @param {string} filePath 
   * @private
   */
  static async _cleanupTemporaryFile(filePath) {
    try {
      // Periksa keberadaan file sebelum penghapusan
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (cleanupError) {
      // Log error pembersihan tanpa mengganggu alur utama
      console.warn(`Pembersihan file temporary gagal: ${cleanupError.message}`);
    }
  }
}

module.exports = ImageCompressionService;