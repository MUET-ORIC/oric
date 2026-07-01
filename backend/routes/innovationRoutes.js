const express = require('express');
const upload = require('../config/multer');
const authenticateToken = require('../middleware/auth');
const { handleKpiPost } = require('../controllers/kpiController');
const {
    innovationKpi1Headers,
    innovationKpi2Headers,
    innovationKpi3Headers,
    innovationKpi4Headers,
    innovationKpi5Headers,
    innovationKpi6Headers,
    innovationKpi9Headers,
    innovationKpi10Headers,
    innovationKpi13Headers,
    innovationKpi14Headers,
    innovationKpi15Headers,
    innovationKpi16Headers,
    innovationKpi17Headers,
    innovationFieldMaps,
} = require('../constants/innovation');

const router = express.Router();
const MODULE = 'InnovationCommercialization';

const createRoute = (kpiNumber, headers, fieldMapIndex) => {
    router.post(`/kpi${kpiNumber}`, authenticateToken, upload.single('documentFile'), (req, res) => {
        handleKpiPost(req, res, MODULE, `KPI${kpiNumber}`, headers, innovationFieldMaps[fieldMapIndex]);
    });
};

// KPI1..17 (some reuse headers)
createRoute(1, innovationKpi1Headers, 0);
createRoute(2, innovationKpi2Headers, 1);
createRoute(3, innovationKpi3Headers, 2);
createRoute(4, innovationKpi4Headers, 3);
createRoute(5, innovationKpi5Headers, 4);
createRoute(6, innovationKpi6Headers, 5);
createRoute(7, innovationKpi5Headers, 6);  // KPI7 uses KPI5 headers
createRoute(8, innovationKpi6Headers, 7);  // KPI8 uses KPI6 headers
createRoute(9, innovationKpi9Headers, 8);
createRoute(10, innovationKpi10Headers, 9);
createRoute(11, innovationKpi9Headers, 10); // KPI11 uses KPI9 headers
createRoute(12, innovationKpi10Headers, 11); // KPI12 uses KPI10 headers
createRoute(13, innovationKpi13Headers, 12);
createRoute(14, innovationKpi14Headers, 13);
createRoute(15, innovationKpi15Headers, 14);
createRoute(16, innovationKpi16Headers, 15);
createRoute(17, innovationKpi17Headers, 16);

module.exports = router;