
import { useEffect, useState } from 'react';

const Countdown = () => {
  // Set your event date/time here (Oct 03, 2025, 11:59 PM)
  const eventDate = new Date('2025-10-09T23:59:59+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const diff = eventDate - now;
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl sm:text-3xl md:text-4xl text-[#A3FF03] mb-8 font-mono animate-flicker">
      {/* Mobile Layout - Stack vertically */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
            <div className="text-lg font-light">Days</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-lg font-light">Hours</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-lg font-light">Minutes</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-lg font-light">Seconds</div>
          </div>
        </div>
      </div>
      
      {/* Desktop Layout - Horizontal */}
      <div className="hidden sm:block">
        <div className="flex justify-center items-center space-x-4 md:space-x-8 lg:space-x-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
            <div className="text-sm md:text-base font-light">Days</div>
          </div>
          <div className="text-2xl md:text-3xl">:</div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-sm md:text-base font-light">Hours</div>
          </div>
          <div className="text-2xl md:text-3xl">:</div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-sm md:text-base font-light">Minutes</div>
          </div>
          <div className="text-2xl md:text-3xl">:</div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-sm md:text-base font-light">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
export { Countdown };