import React from "react";

const Attendance = () => {
  const dummyAttendance = [
    { id: 1, date: "2025-11-01", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", hours: 8.5 },
    { id: 2, date: "2025-10-31", status: "Present", checkIn: "09:15 AM", checkOut: "05:45 PM", hours: 8.5 },
    { id: 3, date: "2025-10-30", status: "Absent", checkIn: "-", checkOut: "-", hours: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <p className="text-sm text-blue-100 mb-2">Total Days</p>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-6 text-white">
          <p className="text-sm text-emerald-100 mb-2">Present</p>
          <p className="text-3xl font-bold">23</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 text-white">
          <p className="text-sm text-red-100 mb-2">Absent</p>
          <p className="text-3xl font-bold">1</p>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Check In</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Check Out</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Hours</th>
              </tr>
            </thead>
            <tbody>
              {dummyAttendance.map((record) => (
                <tr key={record.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition">
                  <td className="px-6 py-4 text-gray-300">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === "Present"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{record.checkIn}</td>
                  <td className="px-6 py-4 text-gray-300">{record.checkOut}</td>
                  <td className="px-6 py-4 font-semibold text-gray-300">{record.hours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
