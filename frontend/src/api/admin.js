import axios from 'axios';

export const getSubmissions = (params) => {
    return axios.get(`/api/submissions`, { params });
};

export const getSubmissionById = (id) => {
    return axios.get(`/api/submissions/${id}`);
};

export const deleteSubmission = (id) => {
    return axios.delete(`/api/submissions/${id}`);
};

export const updateSubmission = (id, data) => {
    return axios.put(`/api/submissions/${id}`, data);
};

export const exportCsv = (params) => {
    return axios.get(`/api/export/csv`, {
        params,
        responseType: 'blob',
    });
};

export const getDashboardStats = () => {
    return axios.get(`/api/dashboard/stats`);
};