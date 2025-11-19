import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { clockIn, clockOut } from "../../api/attendanceApi";

const AttendanceWidget = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [duration, setDuration] = useState("00:00:00");
  const [message, setMessage] = useState("");

  // Load clock-in time from localStorage on component mount
  useEffect(() => {
    const savedClockIn = localStorage.getItem("clockInTime");
    if (savedClockIn) {
      setClockInTime(new Date(savedClockIn));
    }
  }, []);

  // Update timer every second
  useEffect(() => {
    if (!clockInTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - new Date(clockInTime); // difference in milliseconds
      
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
      const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      
      setDuration(`${hours}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [clockInTime]);

  const handleClockIn = async () => {
    try {
      const res = await clockIn();
      const now = new Date();
      setClockInTime(now);
      localStorage.setItem("clockInTime", now.toISOString());
      setMessage(res.message || "Clocked in successfully");
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error clocking in");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await clockOut();
      setClockInTime(null);
      localStorage.removeItem("clockInTime");
      setDuration("00:00:00");
      setMessage(res.message || "Clocked out successfully");
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error clocking out");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Clock className="h-5 w-5 text-gray-600" />
      
      {clockInTime ? (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">On Duty</span>
            <span className="text-sm font-semibold text-green-600">{duration}</span>
          </div>
          <button
            onClick={handleClockOut}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clock Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleClockIn}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Clock In
        </button>
      )}
      
      {message && (
        <span className="text-xs text-gray-600 absolute top-20 right-6 bg-white px-3 py-1 rounded shadow-md">
          {message}
        </span>
      )}
    </div>
  );
};

export default AttendanceWidget;
