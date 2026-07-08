import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getSubmissions = (params) => {
    return axios.get(`${API_BASE}/api/submissions`, { params });
};

export const deleteSubmission = (id) => {
    return axios.delete(`${API_BASE}/api/submissions/${id}`);
};

export const updateSubmission = (id, data) => {
    return axios.put(`${API_BASE}/api/submissions/${id}`, data);
};

export const exportCsv = (params) => {
    return axios.get(`${API_BASE}/api/export/csv`, {
        params,
        responseType: 'blob',
    });
};

export const getDashboardStats = () => {
    return axios.get(`${API_BASE}/api/dashboard/stats`);
};