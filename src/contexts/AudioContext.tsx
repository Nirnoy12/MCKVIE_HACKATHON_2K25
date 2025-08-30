import React, { createContext, useContext, useRef, useEffect, useState } from 'react';

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setVolume: (volume: number) => void;
  volume: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      // Auto-play the audio when the component mounts
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Auto-play prevented by browser. User interaction required.');
        }
      };
      
      // Only try to auto-play if user has interacted
      if (hasUserInteracted) {
        playAudio();
      }

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [volume, hasUserInteracted]);

  // Auto-start audio when component mounts
  useEffect(() => {
    const startAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log('Auto-play prevented by browser. User interaction required.');
          // Set up user interaction listener as fallback
          const handleUserInteraction = async () => {
            if (audioRef.current) {
              try {
                await audioRef.current.play();
                setHasUserInteracted(true);
              } catch (error) {
                console.log('Audio play failed:', error);
              }
            }
          };

          document.addEventListener('click', handleUserInteraction, { once: true });
          document.addEventListener('keydown', handleUserInteraction, { once: true });
          document.addEventListener('touchstart', handleUserInteraction, { once: true });

          return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
        }
      }
    };

    startAudio();
  }, []);

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, setVolume, volume }}>
      <audio
        ref={audioRef}
        src="/halloween-trap-252164.mp3"
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
};
