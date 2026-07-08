const express = require('express');
const {
    getSubmissions,
    getSubmissionById,
    updateSubmission,
    deleteSubmission,
    exportCsv,
    getDashboardStats,
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const router = express.Router();

router.get('/submissions', auth, adminOnly, getSubmissions);
router.get('/submissions/:id', auth, getSubmissionById);
router.put('/submissions/:id', auth, adminOnly, updateSubmission);
router.delete('/submissions/:id', auth, adminOnly, deleteSubmission);
router.get('/export/csv', auth, adminOnly, exportCsv);
router.get('/dashboard/stats', auth, adminOnly, getDashboardStats);

module.exports = router;