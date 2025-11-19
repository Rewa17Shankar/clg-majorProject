// // import { useState, useEffect } from "react";
// // import { getAllUsers, updateUserDesignation } from "../../api/userApi";
// // import { getAllDesignations } from "../../api/HR/designationApi";

// // function Designation() {
// //   const [users, setUsers] = useState([]);
// //   const [designations, setDesignations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeRole, setActiveRole] = useState("All Users"); // Default: show all users

// //   useEffect(() => {
// //     fetchUsers();
// //     fetchDesignations();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const data = await getAllUsers();
// //       // Ensure role_name is accessible, e.g., from nested roles
// //       const formattedUsers = data.map((u) => ({
// //         ...u,
// //         role_name: u.roles?.role_name || u.role_name || "Employee",
// //       }));
// //       setUsers(formattedUsers);
// //     } catch (err) {
// //       console.error("Error fetching users:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchDesignations = async () => {
// //     try {
// //       const data = await getAllDesignations();
// //       setDesignations(data);
// //     } catch (err) {
// //       console.error("Error fetching designations:", err);
// //     }
// //   };

// //   const handleDesignationChange = async (userId, designationId) => {
// //     try {
// //       await updateUserDesignation(userId, designationId);
// //       setUsers((prev) =>
// //         prev.map((u) =>
// //           u.id === userId ? { ...u, designationId } : u
// //         )
// //       );
// //       alert("Designation updated successfully ✅");
// //     } catch (err) {
// //       alert("Failed to update designation ❌");
// //       console.error(err);
// //     }
// //   };

// //   if (loading) return <p>Loading users...</p>;

// //   // Filter users by active role
// //   const filteredUsers =
// //     activeRole === "All Users"
// //       ? users
// //       : users.filter((u) => u.role_name.toLowerCase() === activeRole.toLowerCase());

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Manage User Designations</h2>

// //       {/* Role Tabs */}
// //       <div style={{ marginBottom: "20px" }}>
// //         {["All Users", "HR", "Manager", "Employee"].map((role) => (
// //           <button
// //             key={role}
// //             onClick={() => setActiveRole(role)}
// //             style={{
// //               marginRight: "10px",
// //               padding: "8px 16px",
// //               backgroundColor: activeRole === role ? "#007bff" : "#e0e0e0",
// //               color: activeRole === role ? "#fff" : "#000",
// //               border: "none",
// //               borderRadius: "5px",
// //               cursor: "pointer",
// //             }}
// //           >
// //             {role}
// //           </button>
// //         ))}
// //       </div>

// //       <table
// //         border="1"
// //         cellPadding="10"
// //         style={{ borderCollapse: "collapse", width: "100%" }}
// //       >
// //         <thead>
// //           <tr>
// //             <th>User Name</th>
// //             <th>Email</th>
// //             <th>Current Designation</th>
// //             <th>Update Designation</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredUsers.length > 0 ? (
// //             filteredUsers.map((u) => (
// //               <tr key={u.id}>
// //                 <td>{u.username}</td>
// //                 <td>{u.email}</td>
// //                 <td>{u.designations?.title || "Not Assigned"}</td>
// //                 <td>
// //                   <select
// //                     value={u.designationId || ""}
// //                     onChange={(e) =>
// //                       handleDesignationChange(u.id, e.target.value)
// //                     }
// //                   >
// //                     <option value="">Select Designation</option>
// //                     {designations.map((desg) => (
// //                       <option key={desg.id} value={desg.id}>
// //                         {desg.title} {desg.department_name ? `(${desg.department_name})` : ""}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="4" style={{ textAlign: "center" }}>
// //                 No users found for this role.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default Designation;


// import { useState, useEffect } from "react";
// import { getAllUsers, updateUserDesignation } from "../../api/userApi";
// import { getAllDesignations } from "../../api/HR/designationApi";

// function Designation() {
//   const [users, setUsers] = useState([]);
//   const [allDesignations, setAllDesignations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(null);
//   const [activeRole, setActiveRole] = useState("All Users");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [usersData, designationsData] = await Promise.all([
//         getAllUsers(),
//         getAllDesignations()
//       ]);
      
//       setUsers(usersData);
//       setAllDesignations(designationsData);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       alert("❌ Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDesignationChange = async (userId, designationId) => {
//     try {
//       setUpdating(userId);
      
//       // Call API to update designation
//       const updatedUser = await updateUserDesignation(userId, designationId);
      
//       // Update local state immediately
//       setUsers(prevUsers =>
//         prevUsers.map(user =>
//           user.id === userId
//             ? {
//                 ...user,
//                 designation_id: updatedUser.designation_id,
//                 designation: updatedUser.designation
//               }
//             : user
//         )
//       );
      
//       alert("✅ Designation updated successfully!");
//     } catch (err) {
//       console.error("Error updating designation:", err);
//       alert("❌ Failed to update designation");
//     } finally {
//       setUpdating(null);
//     }
//   };

//   // Filter designations based on user's department
//   const getDesignationsForUser = (departmentId) => {
//     if (!departmentId) {
//       return allDesignations; // Show all if no department assigned
//     }
//     return allDesignations.filter(d => d.department_id === departmentId);
//   };

//   // Filter users by role
//   const filteredUsers =
//     activeRole === "All Users"
//       ? users
//       : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

//   if (loading) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <p>Loading users and designations...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
//         Manage User Designations
//       </h2>

//       {/* Role Filter Tabs */}
//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//         {["All Users", "HR", "Manager", "Employee"].map((role) => (
//           <button
//             key={role}
//             onClick={() => setActiveRole(role)}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: activeRole === role ? "#007bff" : "#e0e0e0",
//               color: activeRole === role ? "#fff" : "#000",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               fontWeight: activeRole === role ? "bold" : "normal",
//               transition: "all 0.3s ease"
//             }}
//           >
//             {role}
//           </button>
//         ))}
//       </div>

//       {/* Users Table */}
//       <div style={{ overflowX: "auto" }}>
//         <table
//           border="1"
//           cellPadding="12"
//           style={{ 
//             borderCollapse: "collapse", 
//             width: "100%",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#f8f9fa" }}>
//               <th style={{ padding: "12px", textAlign: "left" }}>User Name</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Role</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Current Department</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Current Designation</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Update Designation</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => {
//                 const userDesignations = getDesignationsForUser(user.department_id);
                
//                 return (
//                   <tr key={user.id} style={{ backgroundColor: "#fff" }}>
//                     <td style={{ padding: "12px" }}>{user.username}</td>
//                     <td style={{ padding: "12px" }}>{user.email}</td>
//                     <td style={{ padding: "12px" }}>
//                       <span style={{
//                         padding: "4px 8px",
//                         backgroundColor: "#e3f2fd",
//                         color: "#1976d2",
//                         borderRadius: "4px",
//                         fontSize: "14px"
//                       }}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td style={{ padding: "12px" }}>
//                       <span style={{
//                         padding: "4px 8px",
//                         backgroundColor: user.department === "None" ? "#f5f5f5" : "#e8f5e9",
//                         color: user.department === "None" ? "#666" : "#2e7d32",
//                         borderRadius: "4px",
//                         fontSize: "14px",
//                         fontWeight: "500"
//                       }}>
//                         {user.department}
//                       </span>
//                     </td>
//                     <td style={{ padding: "12px" }}>
//                       <span style={{
//                         padding: "4px 8px",
//                         backgroundColor: user.designation === "Not Assigned" ? "#fff3e0" : "#f3e5f5",
//                         color: user.designation === "Not Assigned" ? "#e65100" : "#6a1b9a",
//                         borderRadius: "4px",
//                         fontSize: "14px",
//                         fontWeight: "500"
//                       }}>
//                         {user.designation}
//                       </span>
//                     </td>
//                     <td style={{ padding: "12px" }}>
//                       {user.department_id ? (
//                         <>
//                           <select
//                             value={user.designation_id || ""}
//                             onChange={(e) => handleDesignationChange(user.id, e.target.value)}
//                             disabled={updating === user.id || userDesignations.length === 0}
//                             style={{
//                               padding: "8px 12px",
//                               borderRadius: "4px",
//                               border: "1px solid #ccc",
//                               width: "100%",
//                               cursor: updating === user.id ? "not-allowed" : "pointer",
//                               backgroundColor: updating === user.id ? "#f5f5f5" : "#fff"
//                             }}
//                           >
//                             <option value="">-- Select Designation --</option>
//                             {userDesignations.map((desg) => (
//                               <option key={desg.id} value={desg.id}>
//                                 {desg.title}
//                                 {desg.department_name ? ` (${desg.department_name})` : ""}
//                               </option>
//                             ))}
//                           </select>
//                           {updating === user.id && (
//                             <p style={{ 
//                               fontSize: "12px", 
//                               color: "#007bff", 
//                               margin: "4px 0 0 0" 
//                             }}>
//                               Updating...
//                             </p>
//                           )}
//                           {userDesignations.length === 0 && (
//                             <p style={{ 
//                               fontSize: "12px", 
//                               color: "#d32f2f", 
//                               margin: "4px 0 0 0" 
//                             }}>
//                               No designations for this department
//                             </p>
//                           )}
//                         </>
//                       ) : (
//                         <p style={{ 
//                           fontSize: "14px", 
//                           color: "#666", 
//                           fontStyle: "italic",
//                           margin: 0
//                         }}>
//                           Assign department first
//                         </p>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td 
//                   colSpan="6" 
//                   style={{ 
//                     textAlign: "center", 
//                     padding: "20px",
//                     color: "#666",
//                     fontStyle: "italic"
//                   }}
//                 >
//                   No users found for this role.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Designation;









// import { useState, useEffect } from "react";
// import { getAllUsers, updateUserDesignation } from "../../api/userApi";
// import { getAllDesignations } from "../../api/HR/designationApi";

// function Designation() {
//   const [users, setUsers] = useState([]);
//   const [allDesignations, setAllDesignations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(null);
//   const [activeRole, setActiveRole] = useState("All Users");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [usersData, designationsData] = await Promise.all([
//         getAllUsers(),
//         getAllDesignations()
//       ]);
      
//       setUsers(usersData);
//       setAllDesignations(designationsData);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       alert("❌ Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDesignationChange = async (userId, designationId) => {
//     try {
//       setUpdating(userId);
      
//       const updatedUser = await updateUserDesignation(userId, designationId);
      
//       setUsers(prevUsers =>
//         prevUsers.map(user =>
//           user.id === userId
//             ? {
//                 ...user,
//                 designation_id: updatedUser.designation_id,
//                 designation: updatedUser.designation
//               }
//             : user
//         )
//       );
      
//       alert("✅ Designation updated successfully!");
//     } catch (err) {
//       console.error("Error updating designation:", err);
//       alert("❌ Failed to update designation");
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const getDesignationsForUser = (departmentId) => {
//     if (!departmentId) {
//       return allDesignations;
//     }
//     return allDesignations.filter(d => d.department_id === departmentId);
//   };

//   const filteredUsers =
//     activeRole === "All Users"
//       ? users
//       : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
//           <p className="text-gray-400">Loading users and designations...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">
//             Manage User Designations
//           </h2>
//           <p className="text-gray-400 text-sm">
//             Assign and update employee designations based on departments
//           </p>
//         </div>

//         {/* Role Filter Tabs */}
//         <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
//           {["All Users", "HR", "Manager", "Employee"].map((role) => (
//             <button
//               key={role}
//               onClick={() => setActiveRole(role)}
//               className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
//                 activeRole === role
//                   ? "bg-white text-gray-900 shadow-lg"
//                   : "text-gray-400 hover:text-white hover:bg-gray-700/50"
//               }`}
//             >
//               {role}
//             </button>
//           ))}
//         </div>

//         {/* Content Card */}
//         <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-900/50">
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     User Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Current Department
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Current Designation
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Update Designation
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700/50">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => {
//                     const userDesignations = getDesignationsForUser(user.department_id);
                    
//                     return (
//                       <tr 
//                         key={user.id}
//                         className="hover:bg-gray-700/30 transition-colors duration-150"
//                       >
//                         <td className="px-6 py-4 text-sm font-medium text-white">
//                           {user.username}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-300">
//                           {user.email}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
//                             {user.role}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
//                             user.department === "None"
//                               ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
//                               : "bg-green-500/20 text-green-300 border-green-500/30"
//                           }`}>
//                             {user.department}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
//                             user.designation === "Not Assigned"
//                               ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
//                               : "bg-purple-500/20 text-purple-300 border-purple-500/30"
//                           }`}>
//                             {user.designation}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           {user.department_id ? (
//                             <>
//                               <select
//                                 value={user.designation_id || ""}
//                                 onChange={(e) => handleDesignationChange(user.id, e.target.value)}
//                                 disabled={updating === user.id || userDesignations.length === 0}
//                                 className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed w-full"
//                               >
//                                 <option value="">-- Select Designation --</option>
//                                 {userDesignations.map((desg) => (
//                                   <option key={desg.id} value={desg.id}>
//                                     {desg.title}
//                                     {desg.department_name ? ` (${desg.department_name})` : ""}
//                                   </option>
//                                 ))}
//                               </select>
//                               {updating === user.id && (
//                                 <p className="text-xs text-blue-400 mt-1">
//                                   Updating...
//                                 </p>
//                               )}
//                               {userDesignations.length === 0 && (
//                                 <p className="text-xs text-red-400 mt-1">
//                                   No designations for this department
//                                 </p>
//                               )}
//                             </>
//                           ) : (
//                             <p className="text-sm text-gray-500 italic">
//                               Assign department first
//                             </p>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td 
//                       colSpan="6" 
//                       className="px-6 py-16 text-center text-gray-500 italic"
//                     >
//                       No users found for this role.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Designation;



import { useState, useEffect } from "react";
import { getAllUsers, updateUserDesignation } from "../../api/userApi";
import { getAllDesignations } from "../../api/HR/designationApi";

function Designation() {
  const [users, setUsers] = useState([]);
  const [allDesignations, setAllDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [activeRole, setActiveRole] = useState("All Users");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, designationsData] = await Promise.all([
        getAllUsers(),
        getAllDesignations()
      ]);
      
      console.log("📊 Users data:", usersData); // Debug log
      console.log("📊 First user:", usersData[0]); // Debug log
      
      setUsers(usersData);
      setAllDesignations(designationsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("❌ Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDesignationChange = async (userId, designationId) => {
    try {
      setUpdating(userId);
      
      const updatedUser = await updateUserDesignation(userId, designationId);
      
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                designation_id: updatedUser.designation_id,
                designation: updatedUser.designation
              }
            : user
        )
      );
      
      alert("✅ Designation updated successfully!");
    } catch (err) {
      console.error("Error updating designation:", err);
      alert("❌ Failed to update designation");
    } finally {
      setUpdating(null);
    }
  };

  const getDesignationsForUser = (departmentId) => {
    if (!departmentId) {
      return allDesignations;
    }
    return allDesignations.filter(d => d.department_id === departmentId);
  };

  const filteredUsers =
    activeRole === "All Users"
      ? users
      : users.filter((u) => u.role?.toLowerCase() === activeRole.toLowerCase());

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-gray-400">Loading users and designations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Manage User Designations
          </h2>
          <p className="text-gray-400 text-sm">
            Assign and update employee designations based on departments
          </p>
        </div>

        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          {["All Users", "HR", "Manager", "Employee"].map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                activeRole === role
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    User Name
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
                    Current Designation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Update Designation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const userDesignations = getDesignationsForUser(user.department_id);
                    
                    return (
                      <tr 
                        key={user.id}
                        className="hover:bg-gray-700/30 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          {user.username || user.name || "N/A"}  {/* ✅ Fixed with fallbacks */}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            !user.department || user.department === "None"
                              ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
                              : "bg-green-500/20 text-green-300 border-green-500/30"
                          }`}>
                            {user.department || "None"}  {/* ✅ Fixed with fallback */}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            !user.designation || user.designation === "Not Assigned"
                              ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                              : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          }`}>
                            {user.designation || "Not Assigned"}  {/* ✅ Fixed with fallback */}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {user.department_id ? (
                            <>
                              <select
                                value={user.designation_id || ""}
                                onChange={(e) => handleDesignationChange(user.id, e.target.value)}
                                disabled={updating === user.id || userDesignations.length === 0}
                                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed w-full"
                              >
                                <option value="">-- Select Designation --</option>
                                {userDesignations.map((desg) => (
                                  <option key={desg.id} value={desg.id}>
                                    {desg.title}
                                    {desg.department_name ? ` (${desg.department_name})` : ""}
                                  </option>
                                ))}
                              </select>
                              {updating === user.id && (
                                <p className="text-xs text-blue-400 mt-1">
                                  Updating...
                                </p>
                              )}
                              {userDesignations.length === 0 && (
                                <p className="text-xs text-red-400 mt-1">
                                  No designations for this department
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-gray-500 italic">
                              Assign department first
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td 
                      colSpan="6" 
                      className="px-6 py-16 text-center text-gray-500 italic"
                    >
                      No users found for this role.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Designation;
