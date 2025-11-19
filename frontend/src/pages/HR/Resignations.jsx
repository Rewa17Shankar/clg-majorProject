// import React, { useEffect, useState } from "react";
// import { getResignations, updateResignationStatus } from "../../api/HR/resignationApi";

// const Resignations = () => {
//   const [resignations, setResignations] = useState([]);

//   useEffect(() => {
//     fetchResignations();
//   }, []);

//   const fetchResignations = async () => {
//     const res = await getResignations();
//     setResignations(res.data);
//   };

//   const handleStatusChange = async (id, status) => {
//     await updateResignationStatus(id, status);
//     fetchResignations();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Employee Exit / Resignation</h2>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Employee</th>
//             <th className="border p-2">Notice Date</th>
//             <th className="border p-2">Last Working Day</th>
//             <th className="border p-2">Reason</th>
//             <th className="border p-2">Within Notice Period</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {resignations.map((r) => (
//             <tr key={r.id} className="text-center">
//               <td className="border p-2">{r.username} ({r.email})</td>
//               <td className="border p-2">{r.notice_date}</td>
//               <td className="border p-2">{r.last_working_date}</td>
//               <td className="border p-2">{r.reason}</td>
//               <td className="border p-2">
//                 {r.withinNoticePeriod ? "Yes" : "No (Auto Rejected)"}
//               </td>
//               <td className="border p-2">{r.status}</td>
//               <td className="border p-2 space-x-2">
//                 {r.status === "Pending" && r.withinNoticePeriod && (
//                   <>
//                     <button
//                       onClick={() => handleStatusChange(r.id, "Accepted")}
//                       className="bg-blue-500 text-white px-2 py-1 rounded"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(r.id, "Rejected")}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {!r.withinNoticePeriod && <span className="text-red-600">Expired</span>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Resignations;


import React, { useEffect, useState } from "react";
import { getResignations, updateResignationStatus } from "../../api/HR/resignationApi";

const StatusPill = ({ value }) => {
  const getStyles = () => {
    if (value === "Accepted") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (value === "Rejected") return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStyles()}`}>
      {value}
    </span>
  );
};

const Resignations = () => {
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResignations();
  }, []);

  const fetchResignations = async () => {
    try {
      setLoading(true);
      const res = await getResignations();
      setResignations(res.data);
    } catch (error) {
      console.error("Error fetching resignations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateResignationStatus(id, status);
      fetchResignations();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("❌ Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-gray-400">Loading resignations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Employee Exit & Resignations</h2>
          <p className="text-gray-400 text-sm">
            Manage employee resignation requests and exit processes
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          {resignations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No resignation requests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Notice Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Last Working Day
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Notice Period
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {resignations.map((r) => (
                    <tr 
                      key={r.id}
                      className="hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{r.username}</p>
                          <p className="text-xs text-gray-400">{r.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {r.notice_date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {r.last_working_date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                        <p className="line-clamp-2">{r.reason}</p>
                      </td>
                      <td className="px-6 py-4">
                        {r.withinNoticePeriod ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30">
                            Valid
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30">
                            Expired
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill value={r.status} />
                      </td>
                      <td className="px-6 py-4">
                        {r.status === "Pending" && r.withinNoticePeriod ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusChange(r.id, "Accepted")}
                              className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-150"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(r.id, "Rejected")}
                              className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg text-xs font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors duration-150"
                            >
                              Reject
                            </button>
                          </div>
                        ) : !r.withinNoticePeriod ? (
                          <span className="text-xs text-red-400 italic">Auto-rejected</span>
                        ) : (
                          <span className="text-xs text-gray-500 italic">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resignations;
