import React, { useState, useEffect } from "react";

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isRunning]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Timer</h1>
      <div>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          placeholder="Hours"
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="Minutes"
        />
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          placeholder="Seconds"
        />
      </div>
      <button onClick={startTimer}>Start Timer</button>
      <h2>{formatTime(timeLeft)}</h2>
    </div>
  );
}

export default App;
