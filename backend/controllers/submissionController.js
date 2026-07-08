const Submission = require('../models/Submission');
const { upload, uploadToImageKit } = require('../middleware/upload');

// ─── Export the upload middleware ──────────────────────────────
exports.upload = upload.single('pdfFile');

// ─── Submit KPI ──────────────────────────────────────────────────
exports.submitKpi = async (req, res) => {
    try {
        const { module, kpi, department, fields } = req.body;

        // Validate required fields
        if (!module || !kpi || !department || !fields) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: module, kpi, department, fields',
            });
        }

        // Parse fields if sent as JSON string
        let parsedFields = fields;
        if (typeof fields === 'string') {
            try {
                parsedFields = JSON.parse(fields);
            } catch (e) {
                // Keep as string if parsing fails
            }
        }

        // Build submission data
        const submissionData = {
            module,
            kpi,
            department,
            submittedBy: req.user._id,
            fields: parsedFields,
        };

        // Handle PDF upload if present
        if (req.file) {
            try {
                const result = await uploadToImageKit(
                    req.file.buffer,
                    req.file.originalname,
                    'oric_pdfs'
                );
                submissionData.pdfFilename = result.name;
                submissionData.pdfPath = result.url;
                console.log('✅ PDF uploaded to ImageKit:', result.url);
            } catch (uploadErr) {
                console.error('❌ ImageKit upload error:', uploadErr);
                return res.status(500).json({
                    success: false,
                    message: 'PDF upload failed. Please try again.',
                });
            }
        }

        // Save submission
        const submission = new Submission(submissionData);
        await submission.save();

        res.status(201).json({
            success: true,
            message: 'KPI submitted successfully',
            submission,
        });

    } catch (err) {
        console.error('❌ Submission error:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
};

// ─── Get My Submissions ──────────────────────────────────────────
exports.getMySubmissions = async (req, res) => {
    try {
        // Filter: department matches the user's department
        const filter = { department: req.user.department };
        // For department users, only show their own submissions
        if (req.user.role === 'department') {
            filter.submittedBy = req.user._id;
        }
        // For admin, we could optionally show all, but we keep the filter for consistency

        const submissions = await Submission.find(filter)
            .populate('submittedBy', 'username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            submissions,
        });
    } catch (err) {
        console.error('❌ Get submissions error:', err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ─── Get Total Submission Count ──────────────────────────────────
exports.getSubmissionCount = async (req, res) => {
    try {
        // Same filter as getMySubmissions
        const filter = { department: req.user.department };
        if (req.user.role === 'department') {
            filter.submittedBy = req.user._id;
        }

        const count = await Submission.countDocuments(filter);

        res.json({
            success: true,
            count,
        });
    } catch (err) {
        console.error('❌ Count error:', err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};