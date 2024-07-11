import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutToEasyAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect the user to the logout page on component mount
    window.location.href = "/logout";
  }, [navigate]); // Depend on navigate to ensure it's available, though it's not directly used here

  return null; // This component does not render anything
};

export default LogoutToEasyAdmin;
