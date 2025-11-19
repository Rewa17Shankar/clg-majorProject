
// // // import { useState, useEffect } from "react";
// // // import { getDepartments } from "../../api/HR/departmentApi";
// // // import { getAllUsers, updateUserDepartment } from "../../api/userApi";

// // // function Departments() {
// // //   const [departments, setDepartments] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [activeRole, setActiveRole] = useState("All"); // filter

// // //   useEffect(() => {
// // //     fetchDepartments();
// // //     fetchUsers();
// // //   }, []);

// // //   const fetchDepartments = async () => {
// // //     const data = await getDepartments();
// // //     setDepartments(data);
// // //   };

// // //   const fetchUsers = async () => {
// // //     const data = await getAllUsers();
// // //     setUsers(data);
// // //   };

// // //   const handleDeptChange = async (userId, departmentId) => {
// // //     await updateUserDepartment(userId, departmentId);
// // //     fetchUsers(); // refresh after update
// // //     alert("✅ Department updated!");
// // //   };

// // //   // Filter users by role
// // //   const filteredUsers =
// // //     activeRole === "All"
// // //       ? users
// // //       : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

// // //   return (
// // //     <div className="p-6 bg-white shadow rounded-xl">
// // //       <h2 className="text-xl font-semibold mb-4 text-blue-700">
// // //         Department Management
// // //       </h2>

// // //       {/* Role Filter Tabs */}
// // //       <div className="flex gap-4 mb-6">
// // //         {["All", "Manager", "Employee"].map((role) => (
// // //           <button
// // //             key={role}
// // //             onClick={() => setActiveRole(role)}
// // //             className={`px-4 py-2 rounded-lg ${
// // //               activeRole === role
// // //                 ? "bg-blue-600 text-white"
// // //                 : "bg-gray-200 text-gray-700"
// // //             }`}
// // //           >
// // //             {role}s
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* Employees Table */}
// // //       <h3 className="text-lg font-medium mb-2">
// // //         {activeRole === "All" ? "All Users" : `${activeRole}s`} & Departments
// // //       </h3>
// // //       <table className="w-full border">
// // //         <thead>
// // //           <tr className="bg-gray-100">
// // //             <th className="border p-2">ID</th>
// // //             <th className="border p-2">Username</th>
// // //             <th className="border p-2">Email</th>
// // //             <th className="border p-2">Role</th>
// // //             <th className="border p-2">Current Department</th>
// // //             <th className="border p-2">Update Department</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {filteredUsers.map((u) => (
// // //             <tr key={u.id}>
// // //               <td className="border p-2">{u.id}</td>
// // //               <td className="border p-2">{u.username}</td>
// // //               <td className="border p-2">{u.email}</td>
// // //               <td className="border p-2">{u.role}</td>
// // //               <td className="border p-2">{u.department_id || "None"}</td>
// // //               <td className="border p-2">
// // //                 <select
// // //                   value={u.department_id || ""}
// // //                   onChange={(e) => handleDeptChange(u.id, e.target.value)}
// // //                   className="border rounded p-1"
// // //                 >
// // //                   <option value="">-- Select --</option>
// // //                   {departments.map((d) => (
// // //                     <option key={d.id} value={d.id}>
// // //                       { d.name}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }

// // // export default Departments;


// // import { useState, useEffect } from "react";
// // import { getDepartments, getUsersWithDepartments } from "../../api/HR/departmentApi";
// // import { updateUserDepartment } from "../../api/userApi";

// // function Departments() {
// //   const [departments, setDepartments] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [activeRole, setActiveRole] = useState("All");
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const [deptData, userData] = await Promise.all([
// //         getDepartments(),
// //         getUsersWithDepartments()
// //       ]);
// //       setDepartments(deptData);
// //       setUsers(userData);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeptChange = async (userId, departmentId) => {
// //     try {
// //       setLoading(true);
// //       await updateUserDepartment(userId, departmentId);
      
// //       // ✅ Immediately update the local state
// //       setUsers(prevUsers =>
// //         prevUsers.map(user =>
// //           user.id === userId
// //             ? {
// //                 ...user,
// //                 department_id: departmentId,
// //                 departments: departments.find(d => d.id === parseInt(departmentId))
// //               }
// //             : user
// //         )
// //       );
      
// //       alert("✅ Department updated successfully!");
// //     } catch (error) {
// //       console.error("Error updating department:", error);
// //       alert("❌ Failed to update department");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Filter users by role
// //   const filteredUsers =
// //     activeRole === "All"
// //       ? users
// //       : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

// //   return (
// //     <div className="p-6 bg-white shadow rounded-xl">
// //       <h2 className="text-xl font-semibold mb-4 text-blue-700">
// //         Department Management
// //       </h2>

// //       {/* Role Filter Tabs */}
// //       <div className="flex gap-4 mb-6">
// //         {["All", "Manager", "Employee"].map((role) => (
// //           <button
// //             key={role}
// //             onClick={() => setActiveRole(role)}
// //             className={`px-4 py-2 rounded-lg ${
// //               activeRole === role
// //                 ? "bg-blue-600 text-white"
// //                 : "bg-gray-200 text-gray-700"
// //             }`}
// //           >
// //             {role}s
// //           </button>
// //         ))}
// //       </div>

// //       {/* Loading Indicator */}
// //       {loading && (
// //         <div className="mb-4 text-center text-blue-600">
// //           Updating...
// //         </div>
// //       )}

// //       {/* Employees Table */}
// //       <h3 className="text-lg font-medium mb-2">
// //         {activeRole === "All" ? "All Users" : `${activeRole}s`} & Departments
// //       </h3>
// //       <table className="w-full border">
// //         <thead>
// //           <tr className="bg-gray-100">
// //             <th className="border p-2">ID</th>
// //             <th className="border p-2">Username</th>
// //             <th className="border p-2">Email</th>
// //             <th className="border p-2">Role</th>
// //             <th className="border p-2">Current Department</th>
// //             <th className="border p-2">Update Department</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredUsers.map((u) => (
// //             <tr key={u.id}>
// //               <td className="border p-2">{u.id}</td>
// //               <td className="border p-2">{u.username}</td>
// //               <td className="border p-2">{u.email}</td>
// //               <td className="border p-2">{u.role}</td>
// //               <td className="border p-2">
// //                 {/* ✅ Show department name instead of ID */}
// //                 {u.departments?.name || "None"}
// //               </td>
// //               <td className="border p-2">
// //                 <select
// //                   value={u.department_id || ""}
// //                   onChange={(e) => handleDeptChange(u.id, e.target.value)}
// //                   className="border rounded p-1"
// //                   disabled={loading}
// //                 >
// //                   <option value="">-- Select --</option>
// //                   {departments.map((d) => (
// //                     <option key={d.id} value={d.id}>
// //                       {d.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default Departments;



// import { useState, useEffect } from "react";
// import { getDepartments } from "../../api/HR/departmentApi";
// import { getAllUsers, updateUserDepartment } from "../../api/userApi";

// function Departments() {
//   const [departments, setDepartments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [activeRole, setActiveRole] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState(null);

//   useEffect(() => {
//     fetchDepartments();
//     fetchUsers();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const data = await getDepartments();
//       setDepartments(data);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       alert("❌ Failed to fetch departments");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert("❌ Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeptChange = async (userId, departmentId) => {
//     try {
//       setUpdating(userId);
      
//       // Call API to update department
//       const updatedUser = await updateUserDepartment(userId, departmentId);
      
//       // Update local state immediately with the new department info
//       setUsers(prevUsers =>
//         prevUsers.map(user =>
//           user.id === userId
//             ? {
//                 ...user,
//                 department_id: updatedUser.department_id,
//                 department: updatedUser.department
//               }
//             : user
//         )
//       );
      
//       alert("✅ Department updated successfully!");
//     } catch (error) {
//       console.error("Error updating department:", error);
//       alert("❌ Failed to update department");
//     } finally {
//       setUpdating(null);
//     }
//   };

//   // Filter users by role
//   const filteredUsers =
//     activeRole === "All"
//       ? users
//       : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

//   return (
//     <div className="p-6 bg-white shadow rounded-xl">
//       <h2 className="text-xl font-semibold mb-4 text-blue-700">
//         Department Management
//       </h2>

//       {/* Role Filter Tabs */}
//       <div className="flex gap-4 mb-6">
//         {["All", "Manager", "Employee"].map((role) => (
//           <button
//             key={role}
//             onClick={() => setActiveRole(role)}
//             className={`px-4 py-2 rounded-lg transition-colors ${
//               activeRole === role
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {role}s
//           </button>
//         ))}
//       </div>

//       {/* Employees Table */}
//       <h3 className="text-lg font-medium mb-2">
//         {activeRole === "All" ? "All Users" : `${activeRole}s`} & Departments
//       </h3>
      
//       {loading ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600">Loading users...</p>
//         </div>
//       ) : filteredUsers.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600">No users found</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-3 text-left">ID</th>
//                 <th className="border border-gray-300 p-3 text-left">Username</th>
//                 <th className="border border-gray-300 p-3 text-left">Email</th>
//                 <th className="border border-gray-300 p-3 text-left">Role</th>
//                 <th className="border border-gray-300 p-3 text-left">Current Department</th>
//                 <th className="border border-gray-300 p-3 text-left">Update Department</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((u) => (
//                 <tr key={u.id} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 p-3">{u.id}</td>
//                   <td className="border border-gray-300 p-3 font-medium">{u.username}</td>
//                   <td className="border border-gray-300 p-3">{u.email}</td>
//                   <td className="border border-gray-300 p-3">
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
//                       {u.role}
//                     </span>
//                   </td>
//                   <td className="border border-gray-300 p-3">
//                     <span className={`px-3 py-1 rounded text-sm font-medium ${
//                       u.department === "None" 
//                         ? "bg-gray-100 text-gray-600" 
//                         : "bg-green-100 text-green-800"
//                     }`}>
//                       {u.department}
//                     </span>
//                   </td>
//                   <td className="border border-gray-300 p-3">
//                     <select
//                       value={u.department_id || ""}
//                       onChange={(e) => handleDeptChange(u.id, e.target.value)}
//                       disabled={updating === u.id}
//                       className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                     >
//                       <option value="">-- Select Department --</option>
//                       {departments.map((d) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                     {updating === u.id && (
//                       <p className="text-xs text-blue-600 mt-1">Updating...</p>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Departments;























// import { useState, useEffect } from "react";
// import { getDepartments } from "../../api/HR/departmentApi";
// import { getAllUsers, updateUserDepartment } from "../../api/userApi";

// function Departments() {
//   const [departments, setDepartments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [activeRole, setActiveRole] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState(null);

//   useEffect(() => {
//     fetchDepartments();
//     fetchUsers();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const data = await getDepartments();
//       setDepartments(data);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       alert("❌ Failed to fetch departments");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert("❌ Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeptChange = async (userId, departmentId) => {
//     try {
//       setUpdating(userId);
      
//       const updatedUser = await updateUserDepartment(userId, departmentId);
      
//       setUsers(prevUsers =>
//         prevUsers.map(user =>
//           user.id === userId
//             ? {
//                 ...user,
//                 department_id: updatedUser.department_id,
//                 department: updatedUser.department
//               }
//             : user
//         )
//       );
      
//       alert("✅ Department updated successfully!");
//     } catch (error) {
//       console.error("Error updating department:", error);
//       alert("❌ Failed to update department");
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const filteredUsers =
//     activeRole === "All"
//       ? users
//       : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">
//             Department Management
//           </h2>
//           <p className="text-gray-400 text-sm">
//             Manage and assign departments to employees
//           </p>
//         </div>

//         {/* Role Filter Tabs */}
//         <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
//           {["All", "Manager", "Employee"].map((role) => (
//             <button
//               key={role}
//               onClick={() => setActiveRole(role)}
//               className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
//                 activeRole === role
//                   ? "bg-white text-gray-900 shadow-lg"
//                   : "text-gray-400 hover:text-white hover:bg-gray-700/50"
//               }`}
//             >
//               {role}s
//             </button>
//           ))}
//         </div>

//         {/* Content Card */}
//         <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-700/50">
//             <h3 className="text-lg font-semibold text-white">
//               {activeRole === "All" ? "All Users" : `${activeRole}s`} & Departments
//             </h3>
//           </div>
          
//           {loading ? (
//             <div className="text-center py-16">
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
//               <p className="text-gray-400">Loading users...</p>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-16">
//               <p className="text-gray-500">No users found</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-900/50">
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       ID
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       Username
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       Current Department
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       Update Department
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-700/50">
//                   {filteredUsers.map((u) => (
//                     <tr 
//                       key={u.id} 
//                       className="hover:bg-gray-700/30 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4 text-sm text-gray-300">{u.id}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-white">{u.username}</td>
//                       <td className="px-6 py-4 text-sm text-gray-300">{u.email}</td>
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
//                           {u.role}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
//                           u.department === "None" 
//                             ? "bg-gray-600/20 text-gray-400 border-gray-600/30" 
//                             : "bg-green-500/20 text-green-300 border-green-500/30"
//                         }`}>
//                           {u.department}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <select
//                           value={u.department_id || ""}
//                           onChange={(e) => handleDeptChange(u.id, e.target.value)}
//                           disabled={updating === u.id}
//                           className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed w-full"
//                         >
//                           <option value="">-- Select Department --</option>
//                           {departments.map((d) => (
//                             <option key={d.id} value={d.id}>
//                               {d.name}
//                             </option>
//                           ))}
//                         </select>
//                         {updating === u.id && (
//                           <p className="text-xs text-blue-400 mt-1">Updating...</p>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Departments;



import { useState, useEffect } from "react";
import { getDepartments } from "../../api/HR/departmentApi";
import { getAllUsers, updateUserDepartment } from "../../api/userApi";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeRole, setActiveRole] = useState("All");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert("❌ Failed to fetch departments");
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      console.log("📊 Users data:", data); // Debug log
      console.log("📊 First user:", data[0]); // Debug log
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("❌ Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeptChange = async (userId, departmentId) => {
    try {
      setUpdating(userId);
      
      const updatedUser = await updateUserDepartment(userId, departmentId);
      
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                department_id: updatedUser.department_id,
                department: updatedUser.department
              }
            : user
        )
      );
      
      alert("✅ Department updated successfully!");
    } catch (error) {
      console.error("Error updating department:", error);
      alert("❌ Failed to update department");
    } finally {
      setUpdating(null);
    }
  };

  const filteredUsers =
    activeRole === "All"
      ? users
      : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Department Management
          </h2>
          <p className="text-gray-400 text-sm">
            Manage and assign departments to employees
          </p>
        </div>

        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          {["All", "Manager", "Employee"].map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                activeRole === role
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {role}s
            </button>
          ))}
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold text-white">
              {activeRole === "All" ? "All Users" : `${activeRole}s`} & Departments
            </h3>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
              <p className="text-gray-400">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Current Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Update Department
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredUsers.map((u) => (
                    <tr 
                      key={u.id} 
                      className="hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">{u.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {u.username || u.name || "N/A"}  {/* ✅ Fixed with fallbacks */}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          !u.department || u.department === "None" 
                            ? "bg-gray-600/20 text-gray-400 border-gray-600/30" 
                            : "bg-green-500/20 text-green-300 border-green-500/30"
                        }`}>
                          {u.department || "None"}  {/* ✅ Fixed with fallback */}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.department_id || ""}
                          onChange={(e) => handleDeptChange(u.id, e.target.value)}
                          disabled={updating === u.id}
                          className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed w-full"
                        >
                          <option value="">-- Select Department --</option>
                          {departments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        {updating === u.id && (
                          <p className="text-xs text-blue-400 mt-1">Updating...</p>
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
}

export default Departments;
