const express = require('express');
const upload = require('../config/multer');
const authenticateToken = require('../middleware/auth');
const { handleKpiPost } = require('../controllers/kpiController');
const {
    researchKpi1Headers,
    researchKpi2Headers,
    researchKpi3Headers,
    researchKpi4Headers,
    researchKpi5Headers,
    researchKpi6Headers,
    researchKpi7Headers,
    researchKpi8Headers,
    researchKpi9Headers,
    researchKpi10Headers,
    researchKpi11Headers,
    researchKpi12Headers,
    researchKpi13Headers,
    researchKpi14Headers,
    researchKpi15Headers,
    researchKpi16Headers,
    researchKpi17Headers,
    researchKpi18Headers,
    researchFieldMaps,
} = require('../constants/research');

const router = express.Router();
const MODULE = 'ResearchExcellence';

// Helper to create routes programmatically
const createRoute = (kpiNumber, headers, fieldMapIndex) => {
    router.post(`/kpi${kpiNumber}`, authenticateToken, upload.single('documentFile'), (req, res) => {
        handleKpiPost(req, res, MODULE, `KPI${kpiNumber}`, headers, researchFieldMaps[fieldMapIndex]);
    });
};

// KPI1 to KPI18
createRoute(1, researchKpi1Headers, 0);
createRoute(2, researchKpi2Headers, 1);
createRoute(3, researchKpi3Headers, 2);
createRoute(4, researchKpi4Headers, 3);
createRoute(5, researchKpi5Headers, 4);
createRoute(6, researchKpi6Headers, 5);
createRoute(7, researchKpi7Headers, 6);
createRoute(8, researchKpi8Headers, 7);
createRoute(9, researchKpi9Headers, 8);
createRoute(10, researchKpi10Headers, 9);
createRoute(11, researchKpi11Headers, 10);
createRoute(12, researchKpi12Headers, 11);
createRoute(13, researchKpi13Headers, 12);
createRoute(14, researchKpi14Headers, 13);
createRoute(15, researchKpi15Headers, 14);
createRoute(16, researchKpi16Headers, 15);
createRoute(17, researchKpi17Headers, 16);
createRoute(18, researchKpi18Headers, 17);

module.exports = router;