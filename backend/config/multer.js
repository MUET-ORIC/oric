const multer = require('multer');
const path = require('path');
const { getKpiPath } = require('../utils/helpers');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const urlParts = req.originalUrl.split('/');
        const moduleName =
            urlParts[2] === 'research'
                ? 'ResearchExcellence'
                : urlParts[2] === 'innovation'
                    ? 'InnovationCommercialization'
                    : 'SustainabilityCapacityBuilding';
        const department = req.user?.department || req.body.department || 'Unknown';
        const kpi = urlParts[urlParts.length - 1];
        const kpiName = kpi.toUpperCase();
        const { docsFolder } = getKpiPath(moduleName, department, kpiName);
        if (!fs.existsSync(docsFolder)) fs.mkdirSync(docsFolder, { recursive: true });
        cb(null, docsFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only PDF files are allowed'), false);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;