import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const getUserFromStorage = () => {
    try {
        const data = localStorage.getItem('user');
        if (!data) return null;
        const parsed = JSON.parse(data);
        if (typeof parsed === 'object' && parsed !== null && parsed.username) {
            return parsed;
        }
        return null;
    } catch {
        localStorage.removeItem('user');
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromStorage());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            if (user) {
                try {
                    await axios.get('/api/my-submissions');
                } catch {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    setUser(null);
                }
            }
            setLoading(false);
        };
        verify();
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
        } catch (err) {
            console.log(err)
        }


        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);