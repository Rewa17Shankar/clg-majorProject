import React, { useEffect, useState } from "react";
import { getEmployeeMeetings } from "../../../api/EMPLOYEE/meetingApi";

const EmployeeMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const data = await getEmployeeMeetings();
      setMeetings(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Loading meetings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">My Meetings</h2>

        {meetings.length === 0 ? (
          <div className="text-gray-400 text-center py-16">
            No meetings assigned.
          </div>
        ) : (
          <div className="space-y-4">
            {meetings.map((m) => (
              <div
                key={m.id}
                className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-white">{m.title}</h3>
                <p className="text-gray-300 mt-1">{m.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-400 mt-4">
                  <p>
                    <span className="font-medium text-gray-300">Date:</span>{" "}
                    {new Date(m.meeting_date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">Start:</span>{" "}
                    {m.start_time}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">End:</span>{" "}
                    {m.end_time}
                  </p>
                </div>

                <p className="text-gray-400 mt-3">
                  <span className="font-medium text-gray-300">Manager ID:</span>{" "}
                  {m.manager_id}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeMeeting;
