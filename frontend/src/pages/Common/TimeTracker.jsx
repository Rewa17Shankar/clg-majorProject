import { useState, useEffect, useRef } from "react";
import { Clock, PlayCircle, StopCircle } from "lucide-react";

const TimeTracker = ({ userId }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [clockInTime, setClockInTime] = useState(null);
  const intervalRef = useRef(null);

  // Storage keys
  const STORAGE_KEYS = {
    isClockedIn: `clockedIn_${userId}`,
    clockInTime: `clockInTime_${userId}`,
    elapsedTime: `elapsedTime_${userId}`,
  };

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedIsClockedIn = localStorage.getItem(STORAGE_KEYS.isClockedIn);
    const savedClockInTime = localStorage.getItem(STORAGE_KEYS.clockInTime);
    const savedElapsedTime = localStorage.getItem(STORAGE_KEYS.elapsedTime);

    if (savedIsClockedIn === "true" && savedClockInTime) {
      const startTime = parseInt(savedClockInTime, 10);
      const now = Date.now();
      const timePassed = Math.floor((now - startTime) / 1000);
      const previousElapsed = parseInt(savedElapsedTime || "0", 10);
      
      setIsClockedIn(true);
      setClockInTime(startTime);
      setElapsedTime(previousElapsed + timePassed);
    } else if (savedElapsedTime) {
      setElapsedTime(parseInt(savedElapsedTime, 10));
    }
  }, [userId]);

  // Start/stop timer based on clock-in status
  useEffect(() => {
    if (isClockedIn && clockInTime) {
      // Start interval to update elapsed time every second
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const timePassed = Math.floor((now - clockInTime) / 1000);
        const previousElapsed = parseInt(
          localStorage.getItem(STORAGE_KEYS.elapsedTime) || "0",
          10
        );
        const totalElapsed = previousElapsed + timePassed;
        
        setElapsedTime(totalElapsed);
      }, 1000);

      // Cleanup interval on unmount or when clocking out
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      // Clear interval when not clocked in
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isClockedIn, clockInTime]);

  // Handle clock in
  const handleClockIn = async () => {
    const now = Date.now();
    
    setIsClockedIn(true);
    setClockInTime(now);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.isClockedIn, "true");
    localStorage.setItem(STORAGE_KEYS.clockInTime, now.toString());
    
    // Optional: Send to backend
    try {
      await fetch("http://localhost:5000/api/attendance/clock-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          clock_in_time: new Date(now).toISOString(),
        }),
      });
    } catch (error) {
      console.error("Error clocking in:", error);
    }
  };

  // Handle clock out
  const handleClockOut = async () => {
    // Calculate final elapsed time
    const finalElapsedTime = elapsedTime;
    
    setIsClockedIn(false);
    setClockInTime(null);
    
    // Update localStorage with final elapsed time
    localStorage.setItem(STORAGE_KEYS.elapsedTime, finalElapsedTime.toString());
    localStorage.removeItem(STORAGE_KEYS.isClockedIn);
    localStorage.removeItem(STORAGE_KEYS.clockInTime);
    
    // Optional: Send to backend
    try {
      await fetch("http://localhost:5000/api/attendance/clock-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          clock_out_time: new Date().toISOString(),
          hours_worked: (finalElapsedTime / 3600).toFixed(2),
        }),
      });
    } catch (error) {
      console.error("Error clocking out:", error);
    }
  };

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
      <Clock className="h-5 w-5 text-gray-600" />
      
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">
          {isClockedIn ? "Time Worked" : "Last Session"}
        </span>
        <span className="text-lg font-mono font-bold text-gray-800">
          {formatTime(elapsedTime)}
        </span>
      </div>
      
      {isClockedIn ? (
        <button
          onClick={handleClockOut}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <StopCircle className="h-4 w-4" />
          Clock Out
        </button>
      ) : (
        <button
          onClick={handleClockIn}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <PlayCircle className="h-4 w-4" />
          Clock In
        </button>
      )}
    </div>
  );
};

export default TimeTracker;
