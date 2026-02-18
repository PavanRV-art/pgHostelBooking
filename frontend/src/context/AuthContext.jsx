import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        const savedUser = localStorage.getItem('userInfo');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error('Error parsing userInfo from localStorage', error);
            localStorage.removeItem('userInfo');
            return null;
        }
    });

    const login = (data) => {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
