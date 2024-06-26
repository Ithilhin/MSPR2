import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../Services/authAPI'; // Adjust the import path as necessary

function Logout({ onLogout }) {
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState(false);


    useEffect(() => {
        authAPI.logout();
        setIsLoggedOut(true);
        onLogout(false);
    }, []);

    useEffect(() => {
        if (isLoggedOut && !authAPI.isAuthenticated()) {
            navigate("/", { replace: true });
        }
    }, [isLoggedOut, navigate]);

    // Optionally, render a message or a spinner while logging out
    return <div>Logging out...</div>;
}

export default Logout;