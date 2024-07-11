import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../Services/authAPI";
import { toast } from "react-toastify";

// Define the LogoutFromEasyAdmin component with onLogout prop for handling logout state
function LogoutFromEasyAdmin({ onLogout }) {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // useEffect hook to perform logout operation once the component mounts
  useEffect(() => {
    authAPI.logout();
    setIsLoggedOut(true);
    onLogout(false);
  }, []); // Empty dependency array means this effect runs once on mount

  // useEffect hook to redirect the user after successful logout
  useEffect(() => {
    if (isLoggedOut && !authAPI.isAuthenticated()) {
      // Check if user is logged out and not authenticated
      navigate("/", { replace: true }); // Navigate to home page and replace the current entry in the history stack
      toast.info("Vous êtes déconnecté"); // Display a toast notification for logout
    }
  }, [isLoggedOut, navigate]); // Depend on isLoggedOut and navigate to re-run this effect

  // Optionally, render a message or a spinner while logging out
  return <div>Logging out...</div>;
}

export default LogoutFromEasyAdmin;
