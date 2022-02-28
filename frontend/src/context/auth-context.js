import React, { useState, useEffect } from 'react';

import ErrorAlert from '../components/UI/ErrorAlert/ErrorAlert';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (username, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storageLogInFlag = localStorage.getItem('isLoggedIn');
        if (storageLogInFlag === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    async function loginHandler(username, password) {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                throw new Error(
                    resData.message ||
                        `Login Failed. Server message: ${response.message}`
                );
            }

            localStorage.setItem('isLoggedIn', '1');
            localStorage.setItem('userData', JSON.stringify(resData.user));
            setError(null);
            setIsLoggedIn(true);
        } catch (err) {
            setError(err.message || 'Login failed.');
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
            {error && <ErrorAlert errorText={error} />}
        </AuthContext.Provider>
    );
};

export default AuthContext;
