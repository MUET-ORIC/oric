import axios from 'axios';

export const login = async (username, password) => {
    const res = await axios.post(`/auth/login`, { username, password });
    return res.data;
};

export const register = async (username, password, department, role = 'department') => {
    const res = await axios.post(`/auth/register`, { username, password, department, role });
    return res.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};