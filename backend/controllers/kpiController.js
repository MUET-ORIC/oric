const {
    getKpiPath,
    getGlobalKpiPath,
    getGlobalEvidencesPath,
    isFileLocked,
    writeCSVAtomically,
} = require('../utils/helpers');
const fs = require('fs');
const path = require('path');

exports.handleKpiPost = async (req, res, moduleName, kpiName, headers, fieldMapping) => {
    try {
        const b = req.body;
        const file = req.file;
        const department = req.user.department;

        const deptCsvPath = getKpiPath(moduleName, department, kpiName).csvPath;
        const globalCsvPath = getGlobalKpiPath(moduleName, kpiName).csvPath;

        if (isFileLocked(deptCsvPath) || isFileLocked(globalCsvPath)) {
            return res.status(409).json({
                success: false,
                message: 'The CSV file is currently open in another program. Please close it and try again.',
            });
        }

        const row = {};
        Object.keys(fieldMapping).forEach((key) => {
            row[key] = b[key] || 'NIL';
        });
        row.department = department;
        row.document = file ? file.filename : 'NIL';

        const getNextSr = (csvPath) => {
            if (!fs.existsSync(csvPath)) return 1;
            const data = fs.readFileSync(csvPath, 'utf8');
            const lines = data.split('\n').filter((line) => line.trim() !== '');
            return lines.length;
        };

        const srDept = getNextSr(deptCsvPath);
        const srGlobal = getNextSr(globalCsvPath);

        const deptRow = { ...row, sr: srDept };
        writeCSVAtomically(deptCsvPath, headers, deptRow);

        const globalRow = { ...row, sr: srGlobal };
        writeCSVAtomically(globalCsvPath, headers, globalRow);

        if (file) {
            const globalEvidencesDir = getGlobalEvidencesPath(moduleName, kpiName);
            if (!fs.existsSync(globalEvidencesDir)) {
                fs.mkdirSync(globalEvidencesDir, { recursive: true });
            }
            const sourcePath = file.path;
            const targetPath = path.join(globalEvidencesDir, file.filename);
            fs.copyFileSync(sourcePath, targetPath);
        }

        res.json({ success: true, message: `${kpiName} saved`, row: deptRow, globalSr: srGlobal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};