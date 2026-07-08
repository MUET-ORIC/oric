const Submission = require('../models/Submission');
const upload = require('../middleware/upload');

exports.upload = upload.single('pdfFile');

exports.submitKpi = async (req, res) => {
    try {
        const { module, kpi, department, fields } = req.body;
        if (!module || !kpi || !department || !fields) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        let parsedFields = fields;
        if (typeof fields === 'string') {
            try { parsedFields = JSON.parse(fields); } catch (e) { /* keep as string */ }
        }
        const submissionData = {
            module,
            kpi,
            department,
            submittedBy: req.user._id,
            fields: parsedFields,
        };
        if (req.file) {
            submissionData.pdfFilename = req.file.filename;
            submissionData.pdfPath = req.file.path;
        }
        const submission = new Submission(submissionData);
        await submission.save();
        res.status(201).json({ success: true, message: 'KPI submitted', submission });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMySubmissions = async (req, res) => {
    try {
        const filter = { department: req.user.department };
        if (req.user.role === 'department') filter.submittedBy = req.user._id;
        const submissions = await Submission.find(filter)
            .populate('submittedBy', 'username')
            .sort({ createdAt: -1 });
        res.json({ success: true, submissions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};