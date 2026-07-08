import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// ─── Safe JSON parser ──────────────────────────────────────────
const getUserFromStorage = () => {
    try {
        const data = localStorage.getItem('user');
        if (!data) return null;
        return JSON.parse(data);
    } catch {
        // Invalid JSON → clear it to prevent further errors
        localStorage.removeItem('user');
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = getUserFromStorage();
        if (token && userData) {
            setUser(userData);
        } else {
            // If token exists but user data is missing, clear token
            if (token) localStorage.removeItem('token');
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);