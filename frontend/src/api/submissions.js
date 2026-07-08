import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const submitKpi = async (module, kpi, department, fields, pdfFile) => {
    const formData = new FormData();
    formData.append('module', module);
    formData.append('kpi', kpi);
    formData.append('department', department);
    // Convert empty strings to "NIL"
    Object.keys(fields).forEach(key => {
        if (fields[key] === "" || fields[key] === null || fields[key] === undefined) {
            fields[key] = "NIL";
        }
    });
    formData.append('fields', JSON.stringify(fields));
    if (pdfFile) formData.append('pdfFile', pdfFile);
    const res = await axios.post(`${API_BASE}/api/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export const getMySubmissions = async () => {
    const res = await axios.get(`${API_BASE}/api/my-submissions`);
    return res.data;
};