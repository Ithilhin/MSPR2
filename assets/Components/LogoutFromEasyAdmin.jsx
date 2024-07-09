import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../Services/authAPI'; 
import { toast } from "react-toastify";

function LogoutFromEasyAdmin({ onLogout }) {
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
            toast.info("Vous êtes déconnecté");
        }
    }, [isLoggedOut, navigate]);

    // Optionally, render a message or a spinner while logging out
    return <div>Logging out...</div>;
}

export default LogoutFromEasyAdmin;