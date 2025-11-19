import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { clockInAPI, clockOutAPI, getAttendanceAPI } from "../../../api/attendanceApi";

const Attendance = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);

  const fetchAttendance = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await getAttendanceAPI(user.id);
      setAttendance(res.data || []);
      
      // Check if clocked in today
      const today = new Date().toISOString().split('T')[0];
      const todayRecord = res.data?.find(a => a.date === today);
      setIsClockedIn(todayRecord && todayRecord.start_at && !todayRecord.end_at);
    } catch (err) {
      console.error("Error:", err);
      setMessage("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleClockIn = async () => {
    if (!user) return;
    try {
      await clockInAPI(user.id);
      setMessage("✓ Clocked in!");
      setIsClockedIn(true);
      fetchAttendance();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Clock in failed");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleClockOut = async () => {
    if (!user) return;
    try {
      await clockOutAPI(user.id);
      setMessage("✓ Clocked out!");
      setIsClockedIn(false);
      fetchAttendance();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Clock out failed");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [user]);

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Loading...</div>;
  }

  if (!user) {
    return <div className="text-gray-400 text-center py-8">Please log in</div>;
  }

  const presentDays = attendance.filter(a => a.status === "Present").length;
  const absentDays = attendance.filter(a => a.status === "Absent").length;
  const totalHours = attendance.reduce((sum, a) => sum + (a.hours_worked || 0), 0);

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg text-white ${
          message.includes('✓') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {message}
        </div>
      )}

      {/* Clock Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">⏰ Clock In / Out</h3>
        <div className="flex gap-4">
          <button
            onClick={handleClockIn}
            disabled={isClockedIn}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              isClockedIn
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            Clock In
          </button>
          
          <button
            onClick={handleClockOut}
            disabled={!isClockedIn}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              !isClockedIn
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Clock Out
          </button>

          <div className="flex items-center gap-2 px-4">
            <div className={`h-3 w-3 rounded-full ${isClockedIn ? 'bg-emerald-500' : 'bg-gray-500'}`}></div>
            <span className="text-sm text-gray-400">
              {isClockedIn ? 'Clocked In' : 'Not Clocked In'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border border-emerald-500/50 rounded-lg p-6">
          <p className="text-sm text-emerald-200">Present Days</p>
          <p className="text-3xl font-bold text-white">{presentDays}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/50 rounded-lg p-6">
          <p className="text-sm text-red-200">Absent Days</p>
          <p className="text-3xl font-bold text-white">{absentDays}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/50 rounded-lg p-6">
          <p className="text-sm text-blue-200">Total Hours</p>
          <p className="text-3xl font-bold text-white">{totalHours.toFixed(1)}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white">📅 Attendance History</h3>
        </div>
        
        {attendance.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No records</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-300">Date</th>
                  <th className="px-6 py-3 text-left text-gray-300">Status</th>
                  <th className="px-6 py-3 text-left text-gray-300">Clock In</th>
                  <th className="px-6 py-3 text-left text-gray-300">Clock Out</th>
                  <th className="px-6 py-3 text-left text-gray-300">Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-6 py-3 text-gray-300">{new Date(record.date).toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        record.status === "Present"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-300">{record.start_at ? new Date(record.start_at).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'}) : '-'}</td>
                    <td className="px-6 py-3 text-gray-300">{record.end_at ? new Date(record.end_at).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'}) : '-'}</td>
                    <td className="px-6 py-3 text-gray-300">{record.hours_worked || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
