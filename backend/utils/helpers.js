const fs = require('fs');
const path = require('path');

const BASE_DATA_DIR = path.join(__dirname, '..', 'data');

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

const isFileLocked = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) return false;
        const fd = fs.openSync(filePath, 'r+');
        fs.writeSync(fd, '');
        fs.closeSync(fd);
        return false;
    } catch (err) {
        if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES') {
            return true;
        }
        return false;
    }
};

const writeCSVAtomically = (csvPath, headers, row) => {
    const folder = path.dirname(csvPath);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const fileExists = fs.existsSync(csvPath);
    if (!fileExists) {
        const headerRow = headers.map((h) => h.title).join(',');
        fs.writeFileSync(csvPath, headerRow + '\n');
    }

    let existingData = '';
    if (fileExists) {
        existingData = fs.readFileSync(csvPath, 'utf8');
    }

    const rowValues = headers.map((h) => {
        const val = row[h.id] !== undefined ? row[h.id] : '';
        if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
            return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
    });
    const newLine = rowValues.join(',') + '\n';

    const tempPath = csvPath + '.tmp';
    fs.writeFileSync(tempPath, existingData + newLine, 'utf8');
    fs.renameSync(tempPath, csvPath);
};

module.exports = {
    getKpiPath,
    getGlobalKpiPath,
    getGlobalEvidencesPath,
    isFileLocked,
    writeCSVAtomically,
    BASE_DATA_DIR,
};