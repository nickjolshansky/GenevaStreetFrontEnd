import React, { useState, useEffect } from "react";

const Countdown = (props) => {
  // Convert initial minutes to seconds

  const initialMinutes = 3;
  const initialSeconds = 0;

  const initialTime = initialMinutes * 60 + initialSeconds;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // If timeLeft is 0, stop the timer
    if (timeLeft <= 0) {
      props.postScore();
      return;
    }

    // Start the countdown interval
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval on component unmount or when time reaches 0
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <h1>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </h1>
  );
};

export default Countdown;
