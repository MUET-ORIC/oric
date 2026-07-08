const express = require('express');
const { submitKpi, upload, getMySubmissions } = require('../controllers/submissionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/submit', auth, upload, submitKpi);
router.get('/my-submissions', auth, getMySubmissions);

module.exports = router;