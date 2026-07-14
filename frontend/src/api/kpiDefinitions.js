import axios from 'axios';

export const getKpiDefinitions = async () => {
    const res = await axios.get(`/api/kpi-definitions`);
    return res.data.definitions;
};