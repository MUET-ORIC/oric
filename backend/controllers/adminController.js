const Submission = require('../models/Submission');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

// ─── GET /api/submissions ──────────────────────────────────────────
exports.getSubmissions = async (req, res) => {
    try {
        const {
            module,
            kpi,
            department,
            startDate,
            endDate,
            page = 1,
            limit = 10,
            search,
            submittedBy,
        } = req.query;

        const filter = {};
        const andFilters = [];

        if (module) filter.module = module;
        if (kpi) filter.kpi = kpi;
        if (department) filter.department = department;

        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        if (search && search.trim()) {
            const searchTerm = search.trim();
            const users = await User.find({
                username: { $regex: searchTerm, $options: 'i' },
            }).select('_id');
            const userIds = users.map((u) => u._id);
            andFilters.push({
                $or: [
                    { kpi: { $regex: searchTerm, $options: 'i' } },
                    { submittedBy: { $in: userIds } },
                ],
            });
        }

        if (submittedBy && submittedBy.trim()) {
            const user = await User.findOne({
                username: { $regex: `^${submittedBy.trim()}$`, $options: 'i' },
            });
            if (user) {
                andFilters.push({ submittedBy: user._id });
            } else {
                return res.json({
                    success: true,
                    submissions: [],
                    total: 0,
                    page: parseInt(page),
                    totalPages: 0,
                });
            }
        }

        if (andFilters.length > 0) filter.$and = andFilters;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const submissions = await Submission.find(filter)
            .populate('submittedBy', 'username department')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        const total = await Submission.countDocuments(filter);

        res.json({
            success: true,
            submissions,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── GET /api/submissions/:id ──────────────────────────────────────
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id).populate('submittedBy', 'username department');
        if (!submission) return res.status(404).json({ success: false, message: 'Not found' });
        if (req.user.role !== 'admin' && req.user.department !== submission.department) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        res.json({ success: true, submission });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── PUT /api/submissions/:id ──────────────────────────────────────
exports.updateSubmission = async (req, res) => {
    try {
        const { fields, department } = req.body;
        const updateData = {};
        if (fields) updateData.fields = fields;
        if (department) updateData.department = department;
        const submission = await Submission.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!submission) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, submission });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── DELETE /api/submissions/:id ──────────────────────────────────
exports.deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) return res.status(404).json({ success: false, message: 'Not found' });
        if (submission.pdfPath && fs.existsSync(submission.pdfPath)) {
            fs.unlinkSync(submission.pdfPath);
        }
        await Submission.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── GET /api/export/csv ──────────────────────────────────────────
exports.exportCsv = async (req, res) => {
    try {
        const { module, kpi, department, startDate, endDate, search, submittedBy } = req.query;
        const filter = {};
        const andFilters = [];

        if (module) filter.module = module;
        if (kpi) filter.kpi = kpi;
        if (department) filter.department = department;

        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        if (search && search.trim()) {
            const searchTerm = search.trim();
            const users = await User.find({
                username: { $regex: searchTerm, $options: 'i' },
            }).select('_id');
            const userIds = users.map((u) => u._id);
            andFilters.push({
                $or: [
                    { kpi: { $regex: searchTerm, $options: 'i' } },
                    { submittedBy: { $in: userIds } },
                ],
            });
        }

        if (submittedBy && submittedBy.trim()) {
            const user = await User.findOne({
                username: { $regex: `^${submittedBy.trim()}$`, $options: 'i' },
            });
            if (user) {
                andFilters.push({ submittedBy: user._id });
            } else {
                return res.json({ success: true, data: [] });
            }
        }

        if (andFilters.length > 0) filter.$and = andFilters;

        const submissions = await Submission.find(filter)
            .populate('submittedBy', 'username department')
            .sort({ createdAt: -1 });

        if (submissions.length === 0) {
            const headers = [
                { id: 'module', title: 'Module' },
                { id: 'kpi', title: 'KPI' },
                { id: 'department', title: 'Department' },
                { id: 'submittedBy', title: 'Submitted By' },
                { id: 'createdAt', title: 'Submitted At' },
                { id: 'pdfFilename', title: 'PDF File' },
            ];
            const csvWriter = createObjectCsvWriter({
                path: path.join(__dirname, '../temp_export.csv'),
                header: headers,
            });
            await csvWriter.writeRecords([]);
            return res.download(path.join(__dirname, '../temp_export.csv'), 'submissions.csv', (err) => {
                if (err) console.error(err);
                fs.unlinkSync(path.join(__dirname, '../temp_export.csv'));
            });
        }

        const firstFields = submissions[0].fields || {};
        const fieldKeys = Object.keys(firstFields);

        const headers = [
            { id: 'module', title: 'Module' },
            { id: 'kpi', title: 'KPI' },
            { id: 'department', title: 'Department' },
            { id: 'submittedBy', title: 'Submitted By' },
            { id: 'createdAt', title: 'Submitted At' },
            ...fieldKeys.map((key) => ({ id: `field_${key}`, title: key })),
            { id: 'pdfFilename', title: 'PDF File' },
        ];

        const records = submissions.map((sub) => {
            const row = {
                module: sub.module,
                kpi: sub.kpi,
                department: sub.department,
                submittedBy: sub.submittedBy ? sub.submittedBy.username : 'Unknown',
                createdAt: sub.createdAt.toISOString().split('T')[0],
                pdfFilename: sub.pdfFilename || '',
            };
            fieldKeys.forEach((key) => {
                row[`field_${key}`] = sub.fields && sub.fields[key] !== undefined ? sub.fields[key] : '';
            });
            return row;
        });

        const csvPath = path.join(__dirname, '../temp_export.csv');
        const csvWriter = createObjectCsvWriter({ path: csvPath, header: headers });
        await csvWriter.writeRecords(records);
        res.download(csvPath, 'submissions.csv', (err) => {
            if (err) console.error(err);
            if (fs.existsSync(csvPath)) fs.unlinkSync(csvPath);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── GET /api/dashboard/stats ─────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
    try {
        const total = await Submission.countDocuments();
        const research = await Submission.countDocuments({ module: 'ResearchExcellence' });
        const innovation = await Submission.countDocuments({ module: 'InnovationCommercialization' });
        const sustainability = await Submission.countDocuments({ module: 'SustainabilityCapacityBuilding' });
        const byDepartment = await Submission.aggregate([
            { $group: { _id: '$department', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json({
            success: true,
            stats: { total, research, innovation, sustainability, byDepartment }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};