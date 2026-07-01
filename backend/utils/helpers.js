const fs = require('fs');
const path = require('path');

// ─── Base data directory ──────────────────────────────────────────────
// Use absolute path from project root
const BASE_DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure base directory exists on module load
if (!fs.existsSync(BASE_DATA_DIR)) {
    fs.mkdirSync(BASE_DATA_DIR, { recursive: true });
    console.log(`📁 Created data directory: ${BASE_DATA_DIR}`);
}

// ─── Path helpers ──────────────────────────────────────────────────────
const getKpiPath = (moduleName, department, kpiName) => {
    const safeDept = department.replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const base = path.join(BASE_DATA_DIR, moduleName, safeDept, kpiName);
    return {
        csvPath: path.join(base, `${kpiName}.csv`),
        docsFolder: path.join(base, 'Evidences'),
        baseFolder: base,
    };
};

const getGlobalKpiPath = (moduleName, kpiName) => {
    const base = path.join(BASE_DATA_DIR, moduleName, kpiName);
    return {
        csvPath: path.join(base, `${kpiName}.csv`),
        baseFolder: base,
    };
};

const getGlobalEvidencesPath = (moduleName, kpiName) => {
    return path.join(BASE_DATA_DIR, moduleName, kpiName, 'Evidences');
};

// ─── File lock detection ──────────────────────────────────────────────
const isFileLocked = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) return false;
        const fd = fs.openSync(filePath, 'r+');
        fs.closeSync(fd);
        return false;
    } catch (err) {
        if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES') {
            return true;
        }
        return false;
    }
};

// ─── Atomic CSV writer (creates headers if file doesn’t exist) ──────
const writeCSVAtomically = (csvPath, headers, row) => {
    // Headers must be an array of { id, title }
    if (!headers || !Array.isArray(headers) || headers.length === 0) {
        throw new Error('Headers are empty or invalid.');
    }

    // Ensure folder exists
    const folder = path.dirname(csvPath);
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`📁 Created folder: ${folder}`);
    }

    const fileExists = fs.existsSync(csvPath);
    console.log(`📄 Writing to: ${csvPath} (exists: ${fileExists})`);

    // Build header row if file is new
    if (!fileExists) {
        const headerRow = headers.map(h => h.title).join(',');
        fs.writeFileSync(csvPath, headerRow + '\n', 'utf8');
        console.log(`📝 Written headers: ${headerRow}`);
    }

    // Build data row from headers order
    const rowValues = headers.map(h => {
        const val = row[h.id] !== undefined && row[h.id] !== null ? row[h.id] : '';
        // Escape commas and quotes
        if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
            return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
    });

    const newLine = rowValues.join(',') + '\n';

    // Write atomically (temp file + rename)
    const tempPath = csvPath + '.tmp';
    let existingData = '';
    if (fileExists) {
        existingData = fs.readFileSync(csvPath, 'utf8');
    }
    fs.writeFileSync(tempPath, existingData + newLine, 'utf8');
    fs.renameSync(tempPath, csvPath);
    console.log(`✅ Row appended: ${newLine.trim()}`);
};

module.exports = {
    getKpiPath,
    getGlobalKpiPath,
    getGlobalEvidencesPath,
    isFileLocked,
    writeCSVAtomically,
    BASE_DATA_DIR,
};