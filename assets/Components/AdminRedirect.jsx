import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirects to '/admin' using a side effect on mount. Relies on react-router's useNavigate for potential future navigation enhancements.
const AdminRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "/admin";
  }, [navigate]);

  return null;
};

export default AdminRedirect;
