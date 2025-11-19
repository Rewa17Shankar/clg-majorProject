import React, { useState, useEffect } from "react";
import { clockIn, clockOut } from "../../api/attendanceApi";

const Attendance = () => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleClockIn = async () => {
    try {
      const res = await clockIn();
      setMessage(res.message);
      setStatus("Clocked In");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error clocking in");
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await clockOut();
      setMessage(res.message);
      setStatus("Clocked Out");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error clocking out");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <div className="space-x-4">
        <button
          onClick={handleClockIn}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Time In
        </button>
        <button
          onClick={handleClockOut}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Time Out
        </button>
      </div>
      {status && <p className="mt-4 font-medium">Status: {status}</p>}
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default Attendance;
