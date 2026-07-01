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

        // Validate headers
        if (!headers || !Array.isArray(headers) || headers.length === 0) {
            console.error('❌ Headers are empty or invalid for', moduleName, kpiName);
            return res.status(500).json({
                success: false,
                message: 'Server configuration error: missing CSV headers.',
            });
        }

        console.log(`📝 [${moduleName}] ${kpiName} submission`);
        console.log('📋 Headers count:', headers.length);
        console.log('📦 Form data:', b);
        console.log('📎 File:', file ? file.filename : 'none');

        const deptCsvPath = getKpiPath(moduleName, department, kpiName).csvPath;
        const globalCsvPath = getGlobalKpiPath(moduleName, kpiName).csvPath;

        console.log('📁 Dept CSV:', deptCsvPath);
        console.log('📁 Global CSV:', globalCsvPath);

        if (isFileLocked(deptCsvPath) || isFileLocked(globalCsvPath)) {
            return res.status(409).json({
                success: false,
                message: 'CSV file is currently open. Please close and retry.',
            });
        }

        // Build row
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
        const globalRow = { ...row, sr: srGlobal };

        // Write CSV
        writeCSVAtomically(deptCsvPath, headers, deptRow);
        writeCSVAtomically(globalCsvPath, headers, globalRow);

        console.log(`✅ Dept CSV written: ${path.resolve(deptCsvPath)}`);
        console.log(`✅ Global CSV written: ${path.resolve(globalCsvPath)}`);

        // Handle file upload
        if (file) {
            const globalEvidencesDir = getGlobalEvidencesPath(moduleName, kpiName);
            if (!fs.existsSync(globalEvidencesDir)) {
                fs.mkdirSync(globalEvidencesDir, { recursive: true });
            }
            const sourcePath = file.path;
            const targetPath = path.join(globalEvidencesDir, file.filename);
            fs.copyFileSync(sourcePath, targetPath);
            console.log('📎 File copied to:', targetPath);
        }

        res.json({
            success: true,
            message: `${kpiName} saved`,
            row: deptRow,
            globalSr: srGlobal,
        });
    } catch (err) {
        console.error('❌ handleKpiPost error:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};