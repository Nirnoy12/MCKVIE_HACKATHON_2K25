import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-spooky-dark">
      <div className="text-center">
        <h1 className="text-6xl font-spooky text-gradient-halloween mb-4">404</h1>
        <h2 className="text-2xl text-halloween-orange mb-4">Page Not Found in the Haunted Web</h2>
        <p className="text-xl text-spooky-muted mb-8">
          Looks like this page vanished into the digital graveyard!
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-halloween text-spooky-dark font-semibold rounded-lg hover:glow-orange transition-all duration-300 animate-glow"
        >
          Return to the Living World
        </a>
      </div>
    </div>
  );
};

export default NotFound;
