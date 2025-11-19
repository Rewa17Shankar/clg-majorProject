import React, { useEffect, useState } from "react";
import { getMyTrainings } from "../../../api/EMPLOYEE/trainingApi";

const EmployeeTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getMyTrainings();
      setTrainings(data);
    } catch (err) {
      console.error("Error fetching training:", err);
    }
    setLoading(false);
  };

  const getStatusBadge = (start, end) => {
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);

    if (now < s)
      return (
        <span className="px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
          UPCOMING
        </span>
      );
    else if (now > e)
      return (
        <span className="px-4 py-1 rounded-full bg-green-600/20 text-green-400 text-xs font-semibold border border-green-500/30">
          COMPLETED
        </span>
      );
    else
      return (
        <span className="px-4 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-xs font-semibold border border-yellow-500/30">
          ONGOING
        </span>
      );
  };

  if (loading)
    return (
      <div className="text-center text-gray-400 py-20 text-xl">
        Loading trainings...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-2">My Trainings</h2>
        <p className="text-gray-400 mb-8 text-sm">
          View and track your assigned training programs
        </p>

        {/* Training List */}
        <div className="space-y-6">
          {trainings.length === 0 ? (
            <div className="text-center text-gray-500 bg-gray-800/40 border border-gray-700/50 rounded-xl py-20">
              No trainings assigned yet.
            </div>
          ) : (
            trainings.map((t) => (
              <div
                key={t.id}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-white capitalize">
                    {t.title}
                  </h3>
                  {getStatusBadge(t.start_date, t.end_date)}
                </div>

                <p className="text-gray-300 mt-2 text-sm">{t.description}</p>

                <div className="grid md:grid-cols-2 gap-3 mt-5 text-gray-400 text-sm">
                  <p>
                    <span className="font-medium text-gray-300">Manager:</span>{" "}
                    {t.manager_id}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">Start:</span>{" "}
                    {t.start_date}
                  </p>

                  <p>
                    <span className="font-medium text-gray-300">End:</span>{" "}
                    {t.end_date}
                  </p>

                  <p>
                    <span className="font-medium text-gray-300">Progress:</span>{" "}
                    {t.progress || 0}%
                  </p>

                  {t.material_link && (
                    <p className="col-span-2">
                      <span className="font-medium text-gray-300">Resource:</span>{" "}
                      <a
                        href={t.material_link}
                        target="_blank"
                        className="text-blue-400 underline ml-2"
                      >
                        View Material
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTraining;
