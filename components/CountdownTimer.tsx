'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasValidDate, setHasValidDate] = useState<boolean>(!!targetDate);

  useEffect(() => {
    if (!targetDate) {
      setHasValidDate(false);
      return;
    }

    const target = new Date(targetDate).getTime();
    if (isNaN(target)) {
      setHasValidDate(false);
      return;
    }

    setHasValidDate(true);

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!hasValidDate) {
    return (
      <div className="text-center text-gray-400 uppercase tracking-widest text-sm">
        Schedule to be announced
      </div>
    );
  }

  const units: Array<[string, number]> = [
    ['Days', timeLeft.days],
    ['Hrs', timeLeft.hours],
    ['Mins', timeLeft.minutes],
    ['Secs', timeLeft.seconds],
  ];

  return (
    <div className="flex gap-4 sm:gap-8">
      {units.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-4xl sm:text-6xl font-bold tabular-nums text-white">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-widest text-f1-teal mt-2">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}