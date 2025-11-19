import React, { useEffect, useState } from "react";
import { fetchEmployeeAnnouncements } from "../../../api/EMPLOYEE/employeeAnnouncementsApi";

const EmployeeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnnouncements = async () => {
    try {
      const data = await fetchEmployeeAnnouncements();
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAnnouncements(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">Announcements</h2>

      {loading ? (
        <p className="text-gray-400">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-gray-400">No announcements available.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-gray-800 p-5 rounded-lg border border-gray-700"
            >
              <h3 className="text-xl font-semibold">{a.title}</h3>
              <p className="text-gray-300 mt-2">{a.message}</p>

              <div className="mt-3 text-gray-400 text-sm">
                <p>Manager ID: {a.created_by}</p>
                <p>{new Date(a.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeAnnouncements;
