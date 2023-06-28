import React, { useState, useEffect } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(0); // Current time in seconds
  const [running, setRunning] = useState(false); // Indicates if the stopwatch is running or not
  const [laps, setLaps] = useState([]); // Array of lap times

  useEffect(() => {
    let intervalId;

    // Start the interval when 'running' is true
    if (running) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Increment time by 1 second
      }, 1000);
    }

    // Cleanup function to clear the interval when the component unmounts or 'running' changes
    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  // Event handler for starting the stopwatch
  const handleStart = () => {
    setRunning(true);
  };

  // Event handler for stopping the stopwatch
  const handleStop = () => {
    setRunning(false);
  };

  // Event handler for adding a lap time
  const handleLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  // Event handler for resetting the stopwatch
  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  // Formats the time in MM:SS format
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ minWidth: 300 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "row" }}>
        Stop Watch
      </div>
      <div className='timer-container' style={{ textAlign: "center", fontWeight: "bold", fontSize: 40 }}>
        {formatTime(time)}
      </div>
      {!running && (
        <button
          style={{
            margin: "5px",
            padding: "5px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleStart}>
          Start
        </button>
      )}
      {running && (
        <button
          style={{
            margin: "5px",
            padding: "5px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleStop}>
          Stop
        </button>
      )}
      <button
        style={{
          margin: "5px",
          padding: "5px",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "15px",
          cursor: "pointer",
        }}
        onClick={handleLap}
        disabled={!running}>
        Lap
      </button>
      <button
        style={{
          margin: "5px",
          padding: "5px",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "15px",
          cursor: "pointer",
        }}
        onClick={handleReset}
        disabled={laps.length === 0}>
        Reset
      </button>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}
