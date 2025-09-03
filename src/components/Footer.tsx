import { Instagram, Mail, MapPin, Calendar, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleResetIntro = () => {
    localStorage.removeItem('hasSeenVideoIntro');
    window.location.reload();
  };

  return (
    <footer className="bg-spooky-darker border-t border-halloween-purple-muted mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Event Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading text-gradient-neon">
              MCKVIE Hackathon 2025
            </h3>
            <div className="space-y-2 text-spooky-muted">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-halloween-orange" />
                <span className="text-halloween-orange">Oct 17, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-halloween-orange" />
                <a
                  href="https://www.mckvie.edu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-halloween-orange hover:underline"
                >
                  MCKV Institute of Engineering
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading text-spooky-light">Contact</h3>
            <div className="space-y-2 text-spooky-muted">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-halloween-orange" />
                <a
                  href="mailto:mckvie.hackathon.2k25@gmail.com"
                  className="text-halloween-orange hover:underline"
                >
                  mckvie.hackathon.2k25@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-halloween-orange" />
                <a
                  href="https://www.instagram.com/mckvie_hackathon?igsh=c21nbXJkanVldm1v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-halloween-orange hover:underline"
                >
                  instagram.com/mhack_2k25
                </a>
              </div>
            </div>
          </div>

          {/* Institute Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading text-spooky-light">Institute</h3>
            <p className="text-spooky-muted text-sm leading-relaxed">
              MCKV Institute of Engineering is committed to fostering innovation 
              and technical excellence among students through exciting challenges 
              like this Halloween-themed hackathon.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-halloween-purple-muted mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-spooky-muted text-sm">
              © 2025 MCKV Institute of Engineering. All rights reserved. 
              <span className="text-halloween-orange animate-flicker ml-2">
                👻 Happy Coding! 🎃
              </span>
            </p>
            <button
              onClick={handleResetIntro}
              className="flex items-center space-x-2 text-spooky-muted hover:text-red-400 transition-colors text-sm"
            >
              <Play className="w-4 h-4" />
              <span>Reset for Testing</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
