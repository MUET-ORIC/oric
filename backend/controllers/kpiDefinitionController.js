const kpiDefinitions = require('../constants/kpiDefinitions');

exports.getKpiDefinitions = (req, res) => {
    res.json({ success: true, definitions: kpiDefinitions });
};