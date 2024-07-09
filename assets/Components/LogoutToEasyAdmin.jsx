import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutToEasyAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = '/logout';
  }, [navigate]);

  return null; 
};

export default LogoutToEasyAdmin;