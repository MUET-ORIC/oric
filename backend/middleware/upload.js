// middleware/upload.js
const multer = require('multer');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'), false);
};

// ─── Limit file size to 0.4 MB ──────────────────────────────────────
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 0.4 * 1024 * 1024 } // 400 KB
});

const uploadToImageKit = (buffer, filename, folder = 'oric_pdfs') => {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: buffer,
            fileName: `${Date.now()}-${filename}`,
            folder: folder,
            useUniqueFileName: true,
        }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

module.exports = { upload, uploadToImageKit };