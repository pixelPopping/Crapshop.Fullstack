import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setAuthState({
                    isAuth: true,
                    user: {
                        email: decoded.email,
                        roles: decoded.role,
                        id: decoded.sub,
                    },
                    status: 'done',
                });
            } catch (error) {
                console.error("Ongeldige token:", error);
                setAuthState({ isAuth: false, user: null, status: 'done' });
            }
        } else {
            setAuthState({ isAuth: false, user: null, status: 'done' });
        }
    }, []);

    function logIn(token) {
        try {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setAuthState({
                isAuth: true,
                user: {
                    email: decoded.email,
                    id: decoded.sub || decoded.userId,
                    roles: decoded.roles || [decoded.role],
                    projectId: decoded.projectId,
                },
                status: 'done',
            });
            navigate('/profile');
        } catch (error) {
            console.error("Ongeldige token:", error);
        }
    }

    function logOut() {
        localStorage.removeItem('token');
        setAuthState({ isAuth: false, user: null, status: 'done' });
        navigate('/');
    }

    const contextData = {
        isAuth: authState.isAuth,
        user: authState.user,
        isLoggedOut: !authState.isAuth,
        login: logIn,
        logout: logOut,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;








