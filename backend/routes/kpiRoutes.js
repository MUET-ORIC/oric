const express = require('express');
const { getKpiDefinitions } = require('../controllers/kpiDefinitionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/kpi-definitions', auth, getKpiDefinitions);

module.exports = router;