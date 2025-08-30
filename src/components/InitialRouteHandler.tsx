import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const InitialRouteHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('InitialRouteHandler: Current pathname:', location.pathname);
    
    // Check for first-time visitors on any path except /intro
    if (location.pathname !== '/intro') {
      const hasSeenIntro = localStorage.getItem('hasSeenVideoIntro');
      console.log('InitialRouteHandler: hasSeenIntro value:', hasSeenIntro);
      
      if (hasSeenIntro !== 'true') {
        console.log('InitialRouteHandler: Redirecting to intro');
        // First-time visitor, redirect to intro
        navigate('/intro', { replace: true });
      } else {
        console.log('InitialRouteHandler: User has seen intro, staying on current page');
      }
    }
  }, [location.pathname, navigate]);

  return null; // This component doesn't render anything
};

export default InitialRouteHandler;
