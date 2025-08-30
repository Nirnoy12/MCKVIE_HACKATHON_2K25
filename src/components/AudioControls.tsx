import { useState } from 'react';
import { Volume2, Volume1 } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

const AudioControls = () => {
  const { isPlaying, volume, setVolume } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-spooky-dark/90 backdrop-blur-md border border-halloween-orange rounded-lg p-3 shadow-lg">
      {/* Volume Slider */}
      {showVolumeSlider && (
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-2 bg-spooky-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
            }}
          />
        </div>
      )}
      
      {/* Volume Status Icon */}
      <div className="text-halloween-orange p-2 rounded-lg">
        {volume > 0.5 ? <Volume2 className="w-5 h-5" /> : <Volume1 className="w-5 h-5" />}
      </div>
      
      {/* Volume Toggle */}
      <button
        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        className="text-spooky-muted hover:text-halloween-orange transition-colors duration-300 p-1 rounded"
        title="Volume Control"
      >
        <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </div>
      </button>
    </div>
  );
};

export default AudioControls;
