const express = require('express');
const upload = require('../config/multer');
const authenticateToken = require('../middleware/auth');
const { handleKpiPost } = require('../controllers/kpiController');
const {
    sustainabilityKpi1Headers,
    sustainabilityKpi2Headers,
    sustainabilityKpi3Headers,
    sustainabilityKpi4Headers,
    sustainabilityKpi5Headers,
    sustainabilityKpi6Headers,
    sustainabilityKpi7Headers,
    sustainabilityFieldMaps,
} = require('../constants/sustainability');

const router = express.Router();
const MODULE = 'SustainabilityCapacityBuilding';

const createRoute = (kpiNumber, headers, fieldMapIndex) => {
    router.post(`/kpi${kpiNumber}`, authenticateToken, upload.single('documentFile'), (req, res) => {
        handleKpiPost(req, res, MODULE, `KPI${kpiNumber}`, headers, sustainabilityFieldMaps[fieldMapIndex]);
    });
};

createRoute(1, sustainabilityKpi1Headers, 0);
createRoute(2, sustainabilityKpi2Headers, 1);
createRoute(3, sustainabilityKpi3Headers, 2);
createRoute(4, sustainabilityKpi4Headers, 3);
createRoute(5, sustainabilityKpi5Headers, 4);
createRoute(6, sustainabilityKpi6Headers, 5);
createRoute(7, sustainabilityKpi7Headers, 6);

module.exports = router;