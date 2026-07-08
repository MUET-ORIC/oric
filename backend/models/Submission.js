const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    module: { type: String, required: true },
    kpi: { type: String, required: true },
    department: { type: String, required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fields: { type: mongoose.Schema.Types.Mixed, required: true },
    pdfFilename: { type: String, default: null },
    pdfPath: { type: String, default: null },
}, { timestamps: true });

SubmissionSchema.index({ module: 1, kpi: 1, department: 1, createdAt: -1 });

module.exports = mongoose.model('Submission', SubmissionSchema);