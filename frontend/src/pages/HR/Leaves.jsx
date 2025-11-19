// // frontend/src/pages/Leaves.jsx
// import { useEffect, useMemo, useState } from "react";
// import {getLeaveTypes, createLeaveType, updateLeaveType, deleteLeaveType, getLeaveRequests, createLeaveRequest, setLeaveStatus, deleteLeaveRequestApi, } from "../../api/HR/leaveApi";
// import { fetchEmployees } from "../../api/HR/employeeApi";

// const StatusPill = ({ value }) => {
//   const cls = useMemo(() => {
//     if (value === "Approved") return "bg-green-100 text-green-700";
//     if (value === "Rejected") return "bg-red-100 text-red-700";
//     return "bg-yellow-100 text-yellow-700";
//   }, [value]);
//   return (
//     <span className={`px-2 py-1 rounded text-xs font-semibold ${cls}`}>
//       {value}
//     </span>
//   );
// };

// export default function Leaves() {
//   // Tabs
//   const [activeTab, setActiveTab] = useState("requests");

//   // Leave Types
//   const [types, setTypes] = useState([]);
//   const [newType, setNewType] = useState("");
//   const [editingType, setEditingType] = useState(null);

//   // Leave Requests
//   const [requests, setRequests] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("");
//   const [employees, setEmployees] = useState([]);

//   // Request Form (HR filing request for employee)
//   const [form, setForm] = useState({
//     user_id: "",
//     leave_type_id: "",
//     start_date: "",
//     end_date: "",
//   });

//   const reloadTypes = async () => {
//     const res = await getLeaveTypes();
//     setTypes(res.data || []);
//   };

//   const reloadRequests = async () => {
//     const res = await getLeaveRequests(
//       filterStatus ? { status: filterStatus } : {}
//     );
//     setRequests(res.data || []);
//   };

//   const reloadEmployees = async () => {
//     const res = await fetchEmployees();
//     setEmployees(res.data || []);
//   };

//   useEffect(() => {
//     reloadTypes();
//     reloadEmployees();
//   }, []);

//   useEffect(() => {
//     reloadRequests();
//   }, [filterStatus]);

//   /* ---------- Leave Types handlers ---------- */
//   const handleAddType = async (e) => {
//     e.preventDefault();
//     if (!newType.trim()) return;
//     await createLeaveType(newType.trim());
//     setNewType("");
//     reloadTypes();
//   };

//   const handleUpdateType = async (e) => {
//     e.preventDefault();
//     if (!editingType?.type?.trim()) return;
//     await updateLeaveType(editingType.id, editingType.type.trim());
//     setEditingType(null);
//     reloadTypes();
//   };

//   const handleDeleteType = async (id) => {
//     if (!window.confirm("Delete this leave type?")) return;
//     await deleteLeaveType(id);
//     reloadTypes();
//   };

//   /* ---------- Leave Requests handlers ---------- */
//   const handleCreateRequest = async (e) => {
//     e.preventDefault();
//     const { user_id, leave_type_id, start_date, end_date } = form;
//     if (!user_id || !leave_type_id || !start_date || !end_date) return;
//     await createLeaveRequest(form);
//     setForm({ user_id: "", leave_type_id: "", start_date: "", end_date: "" });
//     reloadRequests();
//     setActiveTab("requests"); // switch back to requests after creating
//   };

//   const handleStatus = async (id, status) => {
//     await setLeaveStatus(id, status);
//     reloadRequests();
//   };

//   const handleDeleteRequest = async (id) => {
//     if (!window.confirm("Delete this leave request?")) return;
//     await deleteLeaveRequestApi(id);
//     reloadRequests();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* TABS */}
//       <div className="flex gap-4 border-b">
//         <button
//           onClick={() => setActiveTab("requests")}
//           className={`px-4 py-2 font-medium ${
//             activeTab === "requests"
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Leave Requests
//         </button>
//         <button
//           onClick={() => setActiveTab("types")}
//           className={`px-4 py-2 font-medium ${
//             activeTab === "types"
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Leave Types
//         </button>
//         <button
//           onClick={() => setActiveTab("new")}
//           className={`px-4 py-2 font-medium ${
//             activeTab === "new"
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           New Request
//         </button>
//       </div>

//       {/* TAB CONTENTS */}
//       {activeTab === "requests" && (
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Leave Requests</h2>
//             <div className="flex gap-2 items-center">
//               <label className="text-sm">Filter</label>
//               <select
//                 className="border rounded p-2"
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="">All</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//           </div>

//           <div className="overflow-x-auto border rounded">
//             <table className="min-w-[800px] w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="text-left p-2">#</th>
//                   <th className="text-left p-2">Employee</th>
//                   <th className="text-left p-2">Type</th>
//                   <th className="text-left p-2">Start</th>
//                   <th className="text-left p-2">End</th>
//                   <th className="text-left p-2">Applied</th>
//                   <th className="text-left p-2">Status</th>
//                   <th className="text-left p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((r) => (
//                   <tr key={r.id} className="border-t">
//                     <td className="p-2">{r.id}</td>
//                     <td className="p-2">
//                       {r.users?.username || r.users?.email} (#{r.user_id})
//                     </td>
//                     <td className="p-2">{r.leave_types?.type}</td>
//                     <td className="p-2">{r.start_date}</td>
//                     <td className="p-2">{r.end_date}</td>
//                     <td className="p-2">
//                       {new Date(r.applied_at).toLocaleString()}
//                     </td>
//                     <td className="p-2">
//                       <StatusPill value={r.status} />
//                     </td>
//                     <td className="p-2 flex gap-2">
//                       <button
//                         disabled={r.status !== "Pending"}
//                         onClick={() => handleStatus(r.id, "Approved")}
//                         className="px-2 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         disabled={r.status !== "Pending"}
//                         onClick={() => handleStatus(r.id, "Rejected")}
//                         className="px-2 py-1 bg-amber-600 text-white rounded disabled:opacity-50"
//                       >
//                         Reject
//                       </button>
//                       <button
//                         onClick={() => handleDeleteRequest(r.id)}
//                         className="px-2 py-1 bg-red-600 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {!requests.length && (
//                   <tr>
//                     <td className="p-3 text-gray-500" colSpan="8">
//                       No leave requests yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       )}

//       {activeTab === "types" && (
//         <section>
//           <h2 className="text-xl font-semibold mb-4">Leave Types</h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             <form
//               onSubmit={editingType ? handleUpdateType : handleAddType}
//               className="border rounded p-4 space-y-3"
//             >
//               <label className="block text-sm font-medium">
//                 {editingType ? "Update Type" : "New Type"}
//               </label>
//               <input
//                 className="border rounded w-full p-2"
//                 placeholder="e.g. Sick Leave"
//                 value={editingType ? editingType.type : newType}
//                 onChange={(e) =>
//                   editingType
//                     ? setEditingType((prev) => ({
//                         ...prev,
//                         type: e.target.value,
//                       }))
//                     : setNewType(e.target.value)
//                 }
//                 required
//               />
//               <div className="flex gap-2">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-3 py-2 rounded"
//                 >
//                   {editingType ? "Update" : "Add"}
//                 </button>
//                 {editingType && (
//                   <button
//                     type="button"
//                     onClick={() => setEditingType(null)}
//                     className="px-3 py-2 rounded border"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <div className="border rounded p-4">
//               <h4 className="font-medium mb-2">All Types</h4>
//               <ul className="divide-y">
//                 {types.map((t) => (
//                   <li
//                     key={t.id}
//                     className="py-2 flex items-center justify-between"
//                   >
//                     <span>{t.type}</span>
//                     <div className="flex gap-2">
//                       <button
//                         className="px-2 py-1 border rounded"
//                         onClick={() => setEditingType(t)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="px-2 py-1 bg-red-600 text-white rounded"
//                         onClick={() => handleDeleteType(t.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//                 {!types.length && (
//                   <li className="py-2 text-sm text-gray-500">
//                     No leave types yet.
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </section>
//       )}

//       {activeTab === "new" && (
//         <section>
//           <h2 className="text-xl font-semibold mb-4">Create Leave Request</h2>
//           <form
//             onSubmit={handleCreateRequest}
//             className="grid md:grid-cols-5 gap-3 border rounded p-4 mb-6"
//           >
//             <select
//               className="border rounded p-2"
//               value={form.user_id}
//               onChange={(e) =>
//                 setForm({ ...form, user_id: Number(e.target.value) })
//               }
//               required
//             >
//               <option value="">Select Employee</option>
//               {employees.map((u) => (
//                 <option key={u.id} value={u.id}>
//                   {u.username || u.email} (#{u.id})
//                 </option>
//               ))}
//             </select>

//             <select
//               className="border rounded p-2"
//               value={form.leave_type_id}
//               onChange={(e) =>
//                 setForm({ ...form, leave_type_id: e.target.value })
//               }
//               required
//             >
//               <option value="">Leave Type</option>
//               {types.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.type}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="date"
//               className="border rounded p-2"
//               value={form.start_date}
//               onChange={(e) => setForm({ ...form, start_date: e.target.value })}
//               required
//             />
//             <input
//               type="date"
//               className="border rounded p-2"
//               value={form.end_date}
//               onChange={(e) => setForm({ ...form, end_date: e.target.value })}
//               required
//             />

//             <button className="bg-green-600 text-white rounded px-3 py-2">
//               Create Request
//             </button>
//           </form>
//         </section>
//       )}
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
  getLeaveRequests,
  createLeaveRequest,
  setLeaveStatus,
  deleteLeaveRequestApi,
} from "../../api/HR/leaveApi";
import { fetchEmployees } from "../../api/HR/employeeApi";

const StatusPill = ({ value }) => {
  const cls = useMemo(() => {
    if (value === "Approved") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (value === "Rejected") return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  }, [value]);
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {value}
    </span>
  );
};

export default function Leaves() {
  const [activeTab, setActiveTab] = useState("requests");
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [editingType, setEditingType] = useState(null);
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    leave_type_id: "",
    start_date: "",
    end_date: "",
  });

  const reloadTypes = async () => {
    try {
      const res = await getLeaveTypes();
      setTypes(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error loading types:", err);
      setTypes([]);
    }
  };

  const reloadRequests = async () => {
    try {
      const res = await getLeaveRequests(
        filterStatus ? { status: filterStatus } : {}
      );
      // ✅ Ensure it's always an array
      const data = res.data?.data || res.data || [];
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading requests:", err);
      setRequests([]);
    }
  };

  const reloadEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error loading employees:", err);
      setEmployees([]);
    }
  };

  useEffect(() => {
    reloadTypes();
    reloadEmployees();
  }, []);

  useEffect(() => {
    reloadRequests();
  }, [filterStatus]);

  const handleAddType = async (e) => {
    e.preventDefault();
    if (!newType.trim()) return;
    try {
      await createLeaveType(newType.trim());
      setNewType("");
      reloadTypes();
      alert("✅ Leave type added!");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleUpdateType = async (e) => {
    e.preventDefault();
    if (!editingType?.type?.trim()) return;
    try {
      await updateLeaveType(editingType.id, editingType.type.trim());
      setEditingType(null);
      reloadTypes();
      alert("✅ Leave type updated!");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteType = async (id) => {
    if (!window.confirm("Delete this leave type?")) return;
    try {
      await deleteLeaveType(id);
      reloadTypes();
      alert("✅ Leave type deleted!");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    const { user_id, leave_type_id, start_date, end_date } = form;
    if (!user_id || !leave_type_id || !start_date || !end_date) {
      alert("❌ All fields required");
      return;
    }
    try {
      await createLeaveRequest({
        user_id: parseInt(user_id),
        leave_type_id: leave_type_id,
        start_date,
        end_date,
      });
      setForm({ user_id: "", leave_type_id: "", start_date: "", end_date: "" });
      reloadRequests();
      setActiveTab("requests");
      alert("✅ Leave request created!");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleStatus = async (id, status) => {
    try {
      const confirmMsg = status === "Approved" 
        ? "✅ Approve this leave request?" 
        : "❌ Reject this leave request?";
      
      if (!window.confirm(confirmMsg)) return;

      await setLeaveStatus(id, status);
      alert(`✅ Leave ${status.toLowerCase()}!`);
      reloadRequests();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Delete this leave request?")) return;
    try {
      await deleteLeaveRequestApi(id);
      reloadRequests();
      alert("✅ Leave request deleted!");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Leave Management</h2>
          <p className="text-gray-400 text-sm">
            Manage leave requests, types, and employee time off
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "requests"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Leave Requests
          </button>
          <button
            onClick={() => setActiveTab("types")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "types"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Leave Types
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "new"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            New Request
          </button>
        </div>

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Leave Requests</h3>
              <div className="flex gap-2 items-center">
                <label className="text-sm text-gray-400">Filter</label>
                <select
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Start
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      End
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {requests && Array.isArray(requests) && requests.length > 0 ? (
                    requests.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm text-gray-300">{r.id}</td>
                        <td className="px-6 py-4 text-sm text-white">
                          {r.users?.username || r.users?.email}{" "}
                          <span className="text-gray-500">(#{r.user_id})</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {r.leave_types?.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(r.start_date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(r.end_date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(r.applied_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill value={r.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              disabled={r.status !== "Pending"}
                              onClick={() => handleStatus(r.id, "Approved")}
                              className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-lg text-xs font-medium border border-green-500/30 hover:bg-green-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
                            >
                              ✅ Approve
                            </button>
                            <button
                              disabled={r.status !== "Pending"}
                              onClick={() => handleStatus(r.id, "Rejected")}
                              className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg text-xs font-medium border border-red-500/30 hover:bg-red-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
                            >
                              ❌ Reject
                            </button>
                            <button
                              onClick={() => handleDeleteRequest(r.id)}
                              className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-medium border border-amber-500/30 hover:bg-amber-500/30 transition-colors duration-150"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-6 py-16 text-gray-500 text-center"
                        colSpan="8"
                      >
                        No leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Types Tab */}
        {activeTab === "types" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingType ? "Update Type" : "Add New Type"}
              </h3>
              <form
                onSubmit={editingType ? handleUpdateType : handleAddType}
                className="space-y-4"
              >
                <input
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                  placeholder="e.g. Sick Leave"
                  value={editingType ? editingType.type : newType}
                  onChange={(e) =>
                    editingType
                      ? setEditingType((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      : setNewType(e.target.value)
                  }
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150"
                  >
                    {editingType ? "Update" : "Add"}
                  </button>
                  {editingType && (
                    <button
                      type="button"
                      onClick={() => setEditingType(null)}
                      className="px-4 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">All Types</h3>
              <ul className="space-y-2">
                {types && Array.isArray(types) && types.length > 0 ? (
                  types.map((t) => (
                    <li
                      key={t.id}
                      className="py-3 px-4 bg-gray-700/30 rounded-lg flex items-center justify-between"
                    >
                      <span className="text-white">{t.type}</span>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-700/50 transition-colors duration-150"
                          onClick={() => setEditingType(t)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg text-xs border border-red-500/30 hover:bg-red-500/30 transition-colors duration-150"
                          onClick={() => handleDeleteType(t.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="py-8 text-sm text-gray-500 text-center">
                    No leave types yet.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* New Request Tab */}
        {activeTab === "new" && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">
              Create Leave Request
            </h3>
            <form onSubmit={handleCreateRequest} className="grid md:grid-cols-5 gap-4">
              <select
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                value={form.user_id}
                onChange={(e) =>
                  setForm({ ...form, user_id: e.target.value })
                }
                required
              >
                <option value="">Select Employee</option>
                {employees && Array.isArray(employees) && employees.length > 0 ? (
                  employees.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username || u.email} (#{u.id})
                    </option>
                  ))
                ) : (
                  <option disabled>No employees available</option>
                )}
              </select>

              <select
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                value={form.leave_type_id}
                onChange={(e) =>
                  setForm({ ...form, leave_type_id: e.target.value })
                }
                required
              >
                <option value="">Leave Type</option>
                {types && Array.isArray(types) && types.length > 0 ? (
                  types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.type}
                    </option>
                  ))
                ) : (
                  <option disabled>No leave types available</option>
                )}
              </select>

              <input
                type="date"
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                required
              />
              <input
                type="date"
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                required
              />

              <button className="bg-green-500/20 text-green-300 rounded-lg px-4 py-3 font-medium border border-green-500/30 hover:bg-green-500/30 transition-colors duration-150">
                Create Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
