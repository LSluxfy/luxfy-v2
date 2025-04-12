
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './LandingPage';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirecionamos para a landing page principal
    navigate('/');
  }, [navigate]);
  
  return <LandingPage />;
};

export default Index;
