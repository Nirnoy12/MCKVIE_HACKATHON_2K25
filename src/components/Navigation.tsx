import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Problems', path: '/problems' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    return path !== '/' && location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-spooky-dark/95 backdrop-blur-md border-b border-halloween-purple-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.jpg" // <-- IMPORTANT: Change this to the path of your image
              alt="MCKVIE Hackathon Logo"
              className="w-10 h-10 rounded-lg animate-glow" // Kept relevant styles
            />
            <div className="hidden sm:block">
              <h1 className="font-heading text-xl text-gradient-ghoul">
                MCKVIE HACKATHON
              </h1>
              <p className="text-xl text-center text-gradient-ghoul -mt-1">2025</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-halloween-orange",
                  isActive(item.path)
                    ? "text-halloween-orange border-b-2 border-halloween-orange pb-1"
                    : "text-spooky-light hover:scale-105"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Rule Book Button */}
            <Button
              variant="ghost_spooky"
              size="sm"
              className="animate-flicker"
              onClick={() => window.open('https://docs.google.com/document/d/1lwzWk2CWIpjDr25E2vpcS4pt4fCh-Mcac_pndgFD29o/edit?usp=sharing', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Rules
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-spooky-light hover:text-halloween-orange transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-halloween-purple-muted">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300",
                    isActive(item.path)
                      ? "text-halloween-orange bg-halloween-purple-muted"
                      : "text-spooky-light hover:text-halloween-orange hover:bg-halloween-purple-muted/50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <Button
                variant="ghost_spooky"
                size="sm"
                className="mx-4 animate-flicker"
                onClick={() => {
                  window.open('https://docs.google.com/document/d/1lwzWk2CWIpjDr25E2vpcS4pt4fCh-Mcac_pndgFD29o/edit?usp=sharing', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Rules
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;