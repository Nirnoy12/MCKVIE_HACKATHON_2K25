
import { AlignJustify } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Countdown = () => {
  // Set your event date/time here (Sep 27, 2025, 12:00 AM)
  const eventDate = new Date('2025-09-27T23:59:59+05:30').getTime();
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
    <div className="text-3xl md:text-4xl text-[#A3FF03] mb-8 font-mono animate-flicker">
      <div className="inline-block text-center space-x-20">
        <span>{timeLeft.days.toString().padStart(2, '0')}</span> <span>{timeLeft.hours.toString().padStart(2, '0')}</span> <span>{timeLeft.minutes.toString().padStart(2, '0')}</span> <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
      </div>
      <p className="mb-2 text-2xl md:text-3xl font-light">&nbsp;&nbsp; Days : &nbsp;Hours : Minutes : Seconds</p>
    </div>
  );
};

export default Countdown;
export { Countdown };