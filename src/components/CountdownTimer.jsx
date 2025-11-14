import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="header__topbar--countdown d-flex">
      <div className="countdown__item">
        <span className="countdown__number">{timeLeft.days}</span>
        <p className="countdown__text">days</p>
      </div>
      <div className="countdown__item">
        <span className="countdown__number">{timeLeft.hours}</span>
        <p className="countdown__text">hrs</p>
      </div>
      <div className="countdown__item">
        <span className="countdown__number">{timeLeft.minutes}</span>
        <p className="countdown__text">mins</p>
      </div>
      <div className="countdown__item">
        <span className="countdown__number">{timeLeft.seconds}</span>
        <p className="countdown__text">secs</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
