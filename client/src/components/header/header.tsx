import "./header.css";

import { useState, useEffect } from "react";

export const WeatherHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);
  let hours: number | string = time.getHours();
  if (hours > 12) {
    hours -= 12;
  }
  if (hours < 9) {
    hours = "0" + hours.toString();
  }

  const minutes = time.getMinutes();
  return (
    <div className='headerContainer'>
      <span className='mainHeader'>
        Check Weather <span className='material-symbols-outlined'>routine</span>
      </span>
      <p className='timeDiv'>
        <span className='timeNow'>Time Now </span>
        <span className='hour'>{hours}</span>
        <span className='minutes'>{minutes}</span>
      </p>
    </div>
  );
};
