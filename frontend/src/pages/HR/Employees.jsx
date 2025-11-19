// import { useEffect, useState } from "react";
// import { fetchEmployees, deleteEmployee } from "../../api/HR/employeeApi";

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // ✅ new filter state

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   const loadEmployees = () => {
//     fetchEmployees()
//       .then((res) => setEmployees(res.data))
//       .catch((err) => console.error("Failed to fetch employees:", err))
//       .finally(() => setLoading(false));
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       await deleteEmployee(id);
//       loadEmployees();
//     }
//   };

//   // ✅ Apply filter
//   const filteredEmployees = employees.filter((emp) => {
//     if (filter === "manager") return emp.roles?.role_name?.toLowerCase() === "manager";
//     if (filter === "employee") return emp.roles?.role_name?.toLowerCase() === "employee";
//     return true; // all
//   });

//   if (loading) return <p className="p-4">Loading employees...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Employees</h2>

//       {/* ✅ Filter Buttons */}
//       <div className="mb-4 flex gap-2">
//         <button
//           onClick={() => setFilter("all")}
//           className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => setFilter("manager")}
//           className={`px-4 py-2 rounded ${filter === "manager" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           Managers
//         </button>
//         <button
//           onClick={() => setFilter("employee")}
//           className={`px-4 py-2 rounded ${filter === "employee" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           Employees
//         </button>
//       </div>

//       {filteredEmployees.length === 0 ? (
//         <p>No employees found.</p>
//       ) : (
//         <table className="table-auto w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Department</th>
//               <th className="border px-4 py-2">Designation</th>
//               <th className="border px-4 py-2">Role</th>
//               <th className="border px-4 py-2">Joined</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map((emp) => (
//               <tr key={emp.id}>
//                 <td className="border px-4 py-2">{emp.username}</td>
//                 <td className="border px-4 py-2">{emp.email}</td>
//                 <td className="border px-4 py-2">{emp.departments?.name || "-"}</td>
//                 <td className="border px-4 py-2">{emp.designations?.title || "-"}</td>
//                 <td className="border px-4 py-2">{emp.roles?.role_name || "-"}</td>
//                 <td className="border px-4 py-2">{emp.date_of_joining}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     onClick={() => handleDelete(emp.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../../api/HR/employeeApi";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    fetchEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Failed to fetch employees:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    if (filter === "manager") return emp.roles?.role_name?.toLowerCase() === "manager";
    if (filter === "employee") return emp.roles?.role_name?.toLowerCase() === "employee";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-gray-400">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Employees</h2>
          <p className="text-gray-400 text-sm">
            View and manage all employee records
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              filter === "all"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("manager")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              filter === "manager"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Managers
          </button>
          <button
            onClick={() => setFilter("employee")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              filter === "employee"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Employees
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No employees found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredEmployees.map((emp) => (
                    <tr 
                      key={emp.id}
                      className="hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {emp.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {emp.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {emp.departments?.name || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {emp.designations?.title || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                          {emp.roles?.role_name || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {emp.date_of_joining}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors duration-150"
                        >
                          Delete
                        </button>
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
}
