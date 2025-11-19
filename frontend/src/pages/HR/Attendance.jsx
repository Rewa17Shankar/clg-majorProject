// // frontend/src/pages/HR/Attendance.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { clockIn, clockOut, getMyAttendance, getPayroll } from "../../api/HR/attendanceApi";
// // import useAuth from "../../hooks/useAuth"; // you have this in your structure

// function formatDuration(ms) {
//   const sec = Math.floor(ms / 1000);
//   const h = Math.floor(sec / 3600);
//   const m = Math.floor((sec % 3600) / 60);
//   const s = sec % 60;
//   return `${h}h ${m}m ${s}s`;
// }

// export default function Attendance() {
//   // const { user } = useAuth(); // expects user object with id and base_salary
//   const [running, setRunning] = useState(false);
//   const [startAt, setStartAt] = useState(null);
//   const [elapsedMs, setElapsedMs] = useState(0);
//   const tickRef = useRef(null);
//   const [todayRecord, setTodayRecord] = useState(null);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [payroll, setPayroll] = useState(null);

//   // load monthly attendance summary
//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await getMyAttendance(month, year);
//         setTodayRecord(data.today || null);
//         setPayroll(data.payroll || null);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     load();
//   }, [month, year]);

//   // timer tick
//   useEffect(() => {
//     if (running && startAt) {
//       tickRef.current = setInterval(() => {
//         setElapsedMs(Date.now() - new Date(startAt).getTime());
//       }, 1000);
//     } else {
//       clearInterval(tickRef.current);
//     }
//     return () => clearInterval(tickRef.current);
//   }, [running, startAt]);

//   const handleClockIn = async () => {
//     try {
//       const res = await clockIn();
//       setStartAt(res.start_at);
//       setRunning(true);
//       setElapsedMs(0);
//       setTodayRecord(res.attendance); // optimistic
//     } catch (err) {
//       console.error(err);
//       alert("Clock-in failed: " + err.message);
//     }
//   };

//   const handleClockOut = async () => {
//     try {
//       const res = await clockOut();
//       setRunning(false);
//       setStartAt(null);
//       setElapsedMs(0);
//       setTodayRecord(res.attendance);
//       // reload payroll summary
//       const p = await getPayroll(user?.id, month, year);
//       setPayroll(p);
//     } catch (err) {
//       console.error(err);
//       alert("Clock-out failed: " + err.message);
//     }
//   };

//   // compute textual status from today's record or elapsed time
//   function getStatus(record) {
//     if (!record) return "No Record";
//     if (record.status) return record.status;
//     const hrs = (record.hours_worked || 0);
//     if (hrs === 0) return "Absent";
//     if (hrs < 4) return "Absent";
//     if (hrs >= 4 && hrs < 8) return "Half Day";
//     return "Present";
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl mb-4">Attendance</h2>

//       <div className="mb-6">
//         <strong>Today status:</strong>{" "}
//         <span>{getStatus(todayRecord)}</span>
//       </div>

//       <div className="mb-4">
//         <div>Timer: {formatDuration(elapsedMs)}</div>
//         {!running ? (
//           <button onClick={handleClockIn} className="px-4 py-2 bg-blue-600 text-white rounded">
//             Start (Clock In)
//           </button>
//         ) : (
//           <button onClick={handleClockOut} className="px-4 py-2 bg-red-600 text-white rounded">
//             Stop (Clock Out)
//           </button>
//         )}
//       </div>

//       <div className="mb-4">
//         <label>Month: </label>
//         <input
//           type="number"
//           value={month}
//           min="1"
//           max="12"
//           onChange={(e) => setMonth(Number(e.target.value))}
//           className="border px-2 py-1"
//         />
//         <label className="ml-4">Year: </label>
//         <input
//           type="number"
//           value={year}
//           onChange={(e) => setYear(Number(e.target.value))}
//           className="border px-2 py-1"
//         />
//       </div>

//       <div>
//         <h3 className="text-xl">Payroll preview</h3>
//         {payroll ? (
//           <div>
//             <div>Base Salary: {payroll.base_salary}</div>
//             <div>Working Days in month: {payroll.working_days}</div>
//             <div>Total Present Days: {payroll.present_days}</div>
//             <div>Overtime Hours: {payroll.overtime_hours}</div>
//             <div>Overtime Pay: {payroll.overtime_pay}</div>
//             <div><strong>Net Pay (estimated): {payroll.net_pay}</strong></div>
//           </div>
//         ) : (
//           <div>No payroll data yet</div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { clockInAPI, clockOutAPI, getAttendanceAPI } from "../../api/HR/attendanceApi";
import { useAuth } from "../../hooks/useAuth";

const Attendance = () => {
  const { user } = useAuth(); // Get logged-in user
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch attendance history
  const fetchAttendance = async () => {
    try {
      const res = await getAttendanceAPI(user.id);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching attendance.");
    }
  };

  // Clock In
  const handleClockIn = async () => {
    try {
      const res = await clockInAPI(user.id);
      setMessage(res.data.message);
      fetchAttendance();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Clock-in failed.");
    }
  };

  // Clock Out
  const handleClockOut = async () => {
    try {
      const res = await clockOutAPI(user.id);
      setMessage(res.data.message);
      fetchAttendance();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Clock-out failed.");
    }
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>

      <div className="mb-4">
        <button
          onClick={handleClockIn}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clock Out
        </button>
      </div>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <h2 className="text-xl font-semibold mb-2">Attendance History</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Start Time</th>
            <th className="border px-2 py-1">End Time</th>
            <th className="border px-2 py-1">Hours Worked</th>
            <th className="border px-2 py-1">Overtime Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-2">
                No attendance records found.
              </td>
            </tr>
          ) : (
            attendance.map((a) => (
              <tr key={a.id}>
                <td className="border px-2 py-1">{a.date}</td>
                <td className="border px-2 py-1">{a.status}</td>
                <td className="border px-2 py-1">
                  {a.start_at ? new Date(a.start_at).toLocaleTimeString() : "-"}
                </td>
                <td className="border px-2 py-1">
                  {a.end_at ? new Date(a.end_at).toLocaleTimeString() : "-"}
                </td>
                <td className="border px-2 py-1">{a.hours_worked}</td>
                <td className="border px-2 py-1">{a.overtime_hours}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
