import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const login = async (username, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
    return res.data;
};

export const register = async (username, password, department, role = 'department') => {
    const res = await axios.post(`${API_BASE}/auth/register`, { username, password, department, role });
    return res.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};