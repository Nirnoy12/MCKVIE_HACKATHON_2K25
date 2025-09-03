import { useEffect, useRef, useState } from 'react';

interface LightBulbToggleProps {
  onTeamButtonClick?: () => void;
}

const LightBulbToggle = ({ onTeamButtonClick }: LightBulbToggleProps) => {
  const [isOn, setIsOn] = useState(false);
  const [showTeamButton, setShowTeamButton] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const dummyCordRef = useRef<SVGLineElement>(null);
  const hitSpotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Update CSS custom properties based on bulb state
    document.documentElement.style.setProperty('--on', isOn ? '1' : '0');
  }, [isOn]);

  const handleCordDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dummyCordRef.current || !hitSpotRef.current) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Update dummy cord position
    dummyCordRef.current.setAttribute('x2', x.toString());
    dummyCordRef.current.setAttribute('y2', y.toString());
  };

  const handleCordRelease = () => {
    if (!dummyCordRef.current) return;

    // Reset cord position
    dummyCordRef.current.setAttribute('x2', '98.7255');
    dummyCordRef.current.setAttribute('y2', '380.5405');

    // Toggle bulb state
    setIsOn(!isOn);
    setShowTeamButton(!isOn);
  };

  const handleTeamButtonClick = () => {
    if (onTeamButtonClick) {
      onTeamButtonClick();
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background gradient based on bulb state */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: isOn 
            ? 'radial-gradient(circle at center, hsl(40, 70%, 60%) 0%, hsl(200, 20%, 20%) 100%)'
            : 'radial-gradient(circle at center, hsl(200, 20%, 20%) 0%, hsl(200, 20%, 10%) 100%)'
        }}
      />

      {/* SVG Bulb Scene */}
      <svg 
        ref={svgRef}
        className="toggle-scene relative z-10 w-full max-w-md h-auto"
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMinYMin" 
        viewBox="0 0 197.451 481.081"
        onMouseDown={handleCordDrag}
        onMouseMove={handleCordDrag}
        onMouseUp={handleCordRelease}
        onTouchStart={handleCordDrag}
        onTouchMove={handleCordDrag}
        onTouchEnd={handleCordRelease}
      >
        <defs>
          <marker id="cord-end" orient="auto" overflow="visible" refX="0" refY="0">
            <path 
              className="toggle-scene__cord-end" 
              fillRule="evenodd" 
              strokeWidth=".2666" 
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </marker>
          <clipPath id="bulb-clip" clipPathUnits="userSpaceOnUse">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="4.677" 
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            />
          </clipPath>
        </defs>

        {/* Cords */}
        <g className="toggle-scene__cords">
          <path 
            ref={cordRef}
            className="toggle-scene__cord" 
            markerEnd="url(#cord-end)" 
            fill="none" 
            strokeLinecap="square" 
            strokeWidth="6" 
            d="M123.228-28.56v150.493" 
            transform="translate(-24.503 256.106)"
            style={{ display: isOn ? 'none' : 'block' }}
          />
          
          {/* Dummy cord for dragging */}
          <line 
            ref={dummyCordRef}
            className="toggle-scene__dummy-cord" 
            markerEnd="url(#cord-end)" 
            x1="98.7255" 
            x2="98.7255" 
            y1="240.5405" 
            y2="380.5405"
            style={{ display: isOn ? 'none' : 'block' }}
          />
          
          {/* Hit spot for interaction */}
          <circle 
            ref={hitSpotRef}
            className="toggle-scene__hit-spot" 
            cx="98.7255" 
            cy="380.5405" 
            r="60" 
            fill="transparent"
            style={{ cursor: 'grab' }}
          />
        </g>

        {/* Bulb */}
        <g className="toggle-scene__bulb bulb" transform="translate(844.069 -645.213)">
          <path 
            className="bulb__cap" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4.677" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          <path 
            className="bulb__cap-shine" 
            d="M-778.379 802.873h25.512v118.409h-25.512z" 
            clipPath="url(#bulb-clip)" 
            transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
          />
          <path 
            className="bulb__cap" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
          />
          <path 
            className="bulb__cap-outline" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4.677" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          <g className="bulb__filament" fill="none" strokeLinecap="round" strokeWidth="5">
            <path d="M-752.914 823.875l-8.858-33.06" />
            <path d="M-737.772 823.875l8.858-33.06" />
          </g>
          <path 
            className="bulb__bulb" 
            strokeLinecap="round" 
            strokeWidth="5" 
            d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
          />
          <circle 
            className="bulb__flash" 
            cx="-745.343" 
            cy="743.939" 
            r="83.725" 
            fill="none" 
            strokeDasharray="10,30" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="10"
            style={{ display: isOn ? 'block' : 'none' }}
          />
          <path 
            className="bulb__shine" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="12" 
            d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
          />
        </g>
      </svg>
      
      {/* ===========================================================
        == NEW SECTION: Image that appears when light is on ==
        ===========================================================
      */}
      <div
        className={`absolute bottom-1/4 left-2/3 -translate-x-1/2 w-full max-w-[150px] sm:max-w-xs transition-all duration-700 ease-out ${
          isOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <img
            src="skeleton-code.png" // Replace with your image URL
            alt="A spooky hackathon team meeting"
            className="rounded-lg shadow-2xl w-full"
            style={{ boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)' }} // A soft orange glow
        />
      </div>
      {/* =========================================================== */}


      {/* Team Button */}
      <div 
        className={`team-button-wrapper absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out ${
          showTeamButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ transitionDelay: showTeamButton ? '200ms' : '0ms' }}
      >
        <button 
          onClick={handleTeamButtonClick}
          className="team-button px-6 py-3 text-lg font-semibold border-none rounded-xl bg-halloween-orange text-black cursor-pointer shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
        >
          View the Organizing Team
        </button>
      </div>

      {/* Instructions */}
      <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white/80 transition-opacity duration-500 ${isOn ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-lg font-medium mb-2">🎃 Spooky Light Bulb</p>
        <p className="text-sm">Drag the cord to turn on the light and reveal the team!</p>
      </div>

      {/* Floating particles when light is on */}
      {isOn && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LightBulbToggle;
