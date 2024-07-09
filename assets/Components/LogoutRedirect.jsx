import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = '/logout';
  }, [navigate]);

  return null; 
};

export default LogoutRedirect;