import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = '/admin';
  }, [navigate]);

  return null; 
};

export default AdminRedirect;