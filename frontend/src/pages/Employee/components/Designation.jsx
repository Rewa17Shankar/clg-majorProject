import React, { useEffect, useState } from "react";
import { fetchMyDesignation } from "../../../api/EMPLOYEE/designationApi";

const Designation = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    try {
      const data = await fetchMyDesignation();
      setInfo(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-white">
        Loading designation details...
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-3xl mx-auto bg-gray-800/40 p-6 rounded-xl shadow-xl border border-gray-700/40">

        <h2 className="text-3xl font-bold text-white mb-4">My Designation</h2>
        <p className="text-gray-400 mb-6">
          View your role, department and designation assigned by HR.
        </p>

        <div className="grid gap-6">
          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Your Name</p>
            <p className="text-white text-lg font-semibold">{info.username}</p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Department</p>
            <p className="text-green-300 text-lg font-semibold">{info.department}</p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Designation</p>
            <p className="text-purple-300 text-lg font-semibold">{info.designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designation;
