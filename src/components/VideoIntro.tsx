import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '@/contexts/AudioContext';

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { audioRef } = useAudio();
  const navigate = useNavigate();

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkipButton(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  // Fallback: force navigate if video never ends
  useEffect(() => {
    if (hasStarted) {
      const fallbackTimer = setTimeout(() => {
        console.log('Fallback timer triggered - navigating to landing page');
        localStorage.setItem('hasSeenVideoIntro', 'true');
        navigate('/', { replace: true });
      }, 30000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [hasStarted, navigate]);

  // Additional fallback: try to play video again if it's not playing after 2 seconds
  useEffect(() => {
    if (hasStarted && videoRef.current) {
      const retryTimer = setTimeout(() => {
        if (videoRef.current && videoRef.current.paused) {
          console.log('Video is paused, attempting to play again');
          videoRef.current.play().catch(err =>
            console.error("Retry video play failed:", err)
          );
        }
      }, 2000);

      return () => clearTimeout(retryTimer);
    }
  }, [hasStarted]);

  const handleStartVideo = () => {
    console.log('handleStartVideo called');
    setHasStarted(true);

    // Start video first
    if (videoRef.current) {
      console.log('Video element found, attempting to play');
      videoRef.current.muted = false; // play with sound if video has audio
      videoRef.current.currentTime = 0; // Reset to beginning
      videoRef.current.play().then(() => {
        console.log('Video started playing successfully');
      }).catch(err => {
        console.error("Video play failed:", err);
        // If video fails, still try to start audio and navigate
        if (audioRef.current) {
          audioRef.current.play().catch(audioErr =>
            console.error("Audio play failed:", audioErr)
          );
        }
        // Navigate after a delay if video fails
        setTimeout(() => {
          localStorage.setItem('hasSeenVideoIntro', 'true');
          navigate('/', { replace: true });
        }, 2000);
      });
    } else {
      console.error('Video element not found');
    }

    // Start background audio after a small delay to ensure sync
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err =>
          console.error("Audio play failed:", err)
        );
      }
    }, 100);
  };

  const handleVideoEnd = () => {
    localStorage.setItem('hasSeenVideoIntro', 'true');
    navigate('/', { replace: true }); // music keeps playing because it's in AudioContext
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenVideoIntro', 'true');
    navigate('/', { replace: true });
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsPlaying(true);
  };

  const handleVideoCanPlay = () => {
    console.log('Video can play through');
    setIsPlaying(true);
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    // If video fails to load, navigate to landing page
    localStorage.setItem('hasSeenVideoIntro', 'true');
    navigate('/', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      {!hasStarted ? (
        // Black screen with "Click on Me" text
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={handleStartVideo}
            className="text-white text-6xl md:text-8xl font-bold hover:text-gray-300 transition-all duration-300 cursor-pointer animate-pulse"
          >
            Click on Me
          </button>
        </div>
      ) : (
        // Video playing
        <div className="relative w-full h-full">
                   <video
           ref={videoRef}
           className="w-full h-full object-cover"
           muted={false}
           onEnded={handleVideoEnd}
           onLoadedData={handleVideoLoad}
           onCanPlayThrough={handleVideoCanPlay}
           onError={handleVideoError}
           onPlay={() => console.log('Video play event fired')}
           onPause={() => console.log('Video pause event fired')}
           onWaiting={() => console.log('Video waiting event fired')}
           onStalled={() => console.log('Video stalled event fired')}
           playsInline
           preload="auto"
           controls={false}
         >
            <source src="/Glowing_pumpkin_face_202508281613_c3lmu.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-spooky-dark/20 to-spooky-dark/40" />

          {/* Loading indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-halloween-orange text-2xl font-spooky animate-pulse">
                Loading Spooky Experience...
              </div>
            </div>
          )}

          {/* Skip Button */}
          {showSkipButton && (
            <button
              onClick={handleSkip}
              className="absolute top-8 right-8 bg-spooky-dark/80 hover:bg-spooky-dark text-halloween-orange border border-halloween-orange px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-halloween-orange/25 animate-flicker"
            >
              Skip Intro
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoIntro;
