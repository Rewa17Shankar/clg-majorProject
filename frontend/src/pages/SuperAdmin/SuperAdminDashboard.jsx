// // // frontend/src/pages/SuperAdminDashboard.jsx
// // import { useState, useEffect } from "react";
// // import {LayoutDashboard, UserPlus, Users, LogOut, UserCircle, Briefcase, Shield, } from "lucide-react";
// // import {addUser, getUserCounts, getAllUsers, resetUserPassword, } from "../../api/userApi";
// // import {getDepartments, getDesignationsByDept, } from "../../api/HR/departmentApi"; // ✅ new imports
// // import { useNavigate } from "react-router-dom";

// // function SuperAdminDashboard() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     role: "Employee",
// //     password: "",
// //     department_id: "",
// //     designation_id: "",
// //     date_of_joining: "",
// //   });

// //   const [counts, setCounts] = useState({ HR: 0, Manager: 0, Employee: 0 });
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [users, setUsers] = useState([]);
// //   const [selectedRole, setSelectedRole] = useState("HR");

// //   // ✅ new state
// //   const [departments, setDepartments] = useState([]);
// //   const [designations, setDesignations] = useState([]);

// //   const navigate = useNavigate();

// //   // ✅ Logout handler
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("role");
// //     sessionStorage.clear();
// //     navigate("/");
// //   };

// //   // ✅ Fetch user counts
// //   const fetchCounts = async () => {
// //     try {
// //       const data = await getUserCounts();
// //       setCounts(data);
// //     } catch (error) {
// //       console.error("Error fetching counts:", error);
// //     }
// //   };

// //   // ✅ Fetch all users
// //   const fetchUsers = async () => {
// //     try {
// //       const data = await getAllUsers();
// //       setUsers(data);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   };

// //   // ✅ Fetch departments initially
// //   useEffect(() => {
// //     fetchCounts();
// //     fetchUsers();
// //     getDepartments().then(setDepartments);
// //   }, []);

// //   // ✅ handle department change → fetch designations
// //   const handleDepartmentChange = async (deptId) => {
// //     setForm({ ...form, department_id: deptId, designation_id: "" });
// //     const data = await getDesignationsByDept(deptId);
// //     setDesignations(data);
// //   };

// //   // ✅ Add User
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await addUser({
// //         username: form.name,
// //         email: form.email,
// //         password: "welcome@123",
// //         role_name: form.role,
// //         department_id: form.department_id,
// //         designation_id: form.designation_id,
// //         date_of_joining: form.date_of_joining,
// //       });
// //       alert("✅ User added successfully");
// //       setForm({
// //         name: "",
// //         email: "",
// //         role: "Employee",
// //         password: "",
// //         department_id: "",
// //         designation_id: "",
// //         date_of_joining: "",
// //       });
// //       fetchCounts();
// //       fetchUsers();
// //     } catch (err) {
// //       console.error("Error adding user:", err);
// //       alert("❌ Failed to add user");
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen w-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
// //         <h2 className="text-2xl font-bold text-gray-800 mb-8">SuperAdmin</h2>
// //         <nav className="flex-1 space-y-3">
// //           <button
// //             onClick={() => setActiveTab("dashboard")}
// //             className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
// //               activeTab === "dashboard"
// //                 ? "bg-blue-500 text-white"
// //                 : "text-gray-700 hover:bg-gray-100"
// //             }`}
// //           >
// //             <LayoutDashboard className="mr-2 h-5 w-5" />
// //             Dashboard
// //           </button>
// //           <button
// //             onClick={() => setActiveTab("addUser")}
// //             className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
// //               activeTab === "addUser"
// //                 ? "bg-blue-500 text-white"
// //                 : "text-gray-700 hover:bg-gray-100"
// //             }`}
// //           >
// //             <UserPlus className="mr-2 h-5 w-5" />
// //             Add User
// //           </button>
// //           <button
// //             onClick={() => setActiveTab("manageUsers")}
// //             className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
// //               activeTab === "manageUsers"
// //                 ? "bg-blue-500 text-white"
// //                 : "text-gray-700 hover:bg-gray-100"
// //             }`}
// //           >
// //             <Users className="mr-2 h-5 w-5" />
// //             Manage Users
// //           </button>
// //         </nav>

// //         <button
// //           onClick={handleLogout}
// //           className="flex items-center px-4 py-2 mt-auto text-red-600 hover:bg-gray-100 rounded-lg"
// //         >
// //           <LogOut className="mr-2 h-5 w-5" />
// //           Logout
// //         </button>
// //       </aside>

// //       {/* Main Section */}
// //       <main className="flex-1 flex flex-col">
// //         {/* Topbar */}
// //         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
// //           <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
// //           <div className="flex items-center gap-3">
// //             <UserCircle className="h-8 w-8 text-gray-500" />
// //             <span className="font-medium text-gray-800">SuperAdmin</span>
// //           </div>
// //         </header>

// //         {/* Content */}
// //         <div className="p-8 flex-1 overflow-y-auto">
// //           {/* Dashboard */}
// //           {activeTab === "dashboard" && (
// //             <div>
// //               <h1 className="text-3xl font-semibold mb-2">
// //                 Welcome back, SuperAdmin 👋
// //               </h1>
// //               <p className="text-gray-600 mb-6">
// //                 Manage HR, Managers, and Employees here.
// //               </p>

// //               <div className="grid grid-cols-3 gap-6">
// //                 <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow p-6 rounded-xl text-center">
// //                   <Shield className="h-8 w-8 mx-auto mb-2" />
// //                   <h2 className="text-2xl font-bold">{counts.HR}</h2>
// //                   <p>HR Users</p>
// //                 </div>
// //                 <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow p-6 rounded-xl text-center">
// //                   <Briefcase className="h-8 w-8 mx-auto mb-2" />
// //                   <h2 className="text-2xl font-bold">{counts.Manager}</h2>
// //                   <p>Managers</p>
// //                 </div>
// //                 <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow p-6 rounded-xl text-center">
// //                   <Users className="h-8 w-8 mx-auto mb-2" />
// //                   <h2 className="text-2xl font-bold">{counts.Employee}</h2>
// //                   <p>Employees</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Add User */}
// //           {activeTab === "addUser" && (
// //             <div className="bg-white shadow-md p-8 rounded-xl max-w-lg">
// //               <h2 className="text-2xl font-semibold mb-6">Add New User</h2>
// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <input
// //                   type="text"
// //                   placeholder="Name"
// //                   className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
// //                   value={form.name}
// //                   onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                   required
// //                 />
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
// //                   value={form.email}
// //                   onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                   required
// //                 />
// //                 <select
// //                   className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
// //                   value={form.role}
// //                   onChange={(e) => setForm({ ...form, role: e.target.value })}
// //                   required
// //                 >
// //                   <option value="HR">HR</option>
// //                   <option value="Manager">Manager</option>
// //                   <option value="Employee">Employee</option>
// //                 </select>

// //                 {/* ✅ Department dropdown */}
// //                 <select
// //                   value={form.department_id}
// //                   onChange={(e) => handleDepartmentChange(e.target.value)}
// //                   className="w-full border rounded-lg px-4 py-2"
// //                 >
// //                   <option value="">Select Department</option>
// //                   {departments.map((d) => (
// //                     <option key={d.id} value={d.id}>
// //                       {d.name}
// //                     </option>
// //                   ))}
// //                 </select>

// //                 {/* ✅ Designation dropdown */}
// //                 <select
// //                   value={form.designation_id}
// //                   onChange={(e) =>
// //                     setForm({ ...form, designation_id: e.target.value })
// //                   }
// //                   className="w-full border rounded-lg px-4 py-2"
// //                   disabled={!form.department_id}
// //                 >
// //                   <option value="">Select Designation</option>
// //                   {designations.map((d) => (
// //                     <option key={d.id} value={d.id}>
// //                       {d.title}
// //                     </option>
// //                   ))}
// //                 </select>

// //                 {/* ✅ Date of Joining */}
// //                 <input
// //                   type="date"
// //                   value={form.date_of_joining}
// //                   onChange={(e) =>
// //                     setForm({ ...form, date_of_joining: e.target.value })
// //                   }
// //                   className="w-full border rounded-lg px-4 py-2"
// //                 />

// //                 <input
// //                   type="password"
// //                   placeholder="Password"
// //                   className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
// //                   value={`welcome@123`}
// //                   disabled
// //                 />
// //                 <button
// //                   type="submit"
// //                   className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
// //                 >
// //                   Create User
// //                 </button>
// //               </form>
// //             </div>
// //           )}

// //           {/* Manage Users stays the same */}
// //           {activeTab === "manageUsers" && (
// //             <div>
// //               <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

// //               {/* Role Tabs */}
// //               <div className="flex space-x-4 mb-6">
// //                 {["HR", "Manager", "Employee"].map((role) => (
// //                   <button
// //                     key={role}
// //                     onClick={() => setSelectedRole(role)}
// //                     className={`px-4 py-2 rounded-lg font-medium transition ${
// //                       selectedRole === role
// //                         ? "bg-blue-600 text-white shadow-md"
// //                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// //                     }`}
// //                   >
// //                     {role}
// //                   </button>
// //                 ))}
// //               </div>

// //               {/* User Table */}
// //               <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
// //                 <thead className="bg-gray-100 text-gray-600">
// //                   <tr>
// //                   <th className="py-3 px-4 text-left">ID</th>
// //                   <th className="py-3 px-4 text-left">Name</th>
// //                   <th className="py-3 px-4 text-left">Email</th>
// //                   <th className="py-3 px-4 text-left">Role</th>
// //                   <th className="py-3 px-4 text-left">Must Reset</th> {/* ✅ New column */}
// //                   <th className="py-3 px-4 text-left">Action</th>
// //                   </tr>
// //                 </thead>
// //                  <tbody>
// //                   {users
// //                     .filter((user) => user.role === selectedRole)
// //                     .map((user) => (
// //                       <tr key={user.id} className="border-t hover:bg-gray-50">
// //                         <td className="py-3 px-4">{user.id}</td>
// //                         <td className="py-3 px-4">{user.name}</td>
// //                         <td className="py-3 px-4">{user.email}</td>
// //                         <td className="py-3 px-4">
// //                           <span className="px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full">
// //                             {user.role}
// //                           </span>
// //                         </td>
// //                         <td className="py-3 px-4">
// //                           {user.must_reset ? (
// //                             <span className="text-red-600 font-medium">True</span>
// //                           ) : (
// //                             <span className="text-green-600 font-medium">False</span>
// //                           )}
// //                         </td>
// //                         <td className="py-3 px-4 space-x-3">
// //                           <button className="text-blue-600 hover:underline">Edit</button>
// //                           <button className="text-red-600 hover:underline">Delete</button>
// //                           {/* ✅ Reset password button */}
// //                           <button
// //                             className="text-orange-600 hover:underline"
// //                             onClick={async () => {
// //                                 try {
// //                                   const res = await resetUserPassword(user.id);
// //                                   alert(res.message); // "Password reset enforced successfully"
// //                                   // ✅ update local state instantly
// //                                   setUsers((prev) =>
// //                                     prev.map((u) => (u.id === user.id ? res.user : u))
// //                                   );
// //                                 } catch (err) {
// //                                   alert(err.error || "Failed to reset password");
// //                                 }
// //                               }}
// //                           >
// //                             Reset Password
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default SuperAdminDashboard;



// // Enhanced SuperAdminDashboard.jsx with Salary Management
// import { useState, useEffect } from "react";
// import { LayoutDashboard, UserPlus, Users, LogOut, UserCircle, Briefcase, Shield, DollarSign, Edit } from "lucide-react";
// import { addUser, getUserCounts, getAllUsers, resetUserPassword, updateUserSalary } from "../../api/userApi";
// import { getDepartments, getDesignationsByDept } from "../../api/HR/departmentApi";
// import { useNavigate } from "react-router-dom";

// function SuperAdminDashboard() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "Employee",
//     password: "",
//     department_id: "",
//     designation_id: "",
//     date_of_joining: "",
//     base_salary: "", // Added salary field
//   });

//   const [counts, setCounts] = useState({ HR: 0, Manager: 0, Employee: 0 });
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [users, setUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("HR");

//   // Salary management states
//   const [editingSalary, setEditingSalary] = useState(null);
//   const [newSalary, setNewSalary] = useState("");

//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     sessionStorage.clear();
//     navigate("/");
//   };

//   const fetchCounts = async () => {
//     try {
//       const data = await getUserCounts();
//       setCounts(data);
//     } catch (error) {
//       console.error("Error fetching counts:", error);
//     }
//   };

//   // const fetchUsers = async () => {
//   //   try {
//   //     const data = await getAllUsers();
//   //     console.log("📊 Fetched users data:", data); // ✅ Add this
//   //     console.log("📊 First user:", data[0]); // ✅ Add this to see structure
//   //     setUsers(data);
//   //   } catch (error) {
//   //     console.error("Error fetching users:", error);
//   //   }
//   // };

//   const fetchUsers = async () => {
//   try {
//     console.log("🔄 Calling getAllUsers API...");
//     const data = await getAllUsers();
//     console.log("📊 Fetched users data:", data);
//     console.log("📊 First user:", data[0]);
//     console.log("📊 First user keys:", data[0] ? Object.keys(data[0]) : "No users");
//     setUsers(data);
//   } catch (error) {
//     console.error("❌ Error fetching users:", error);
//   }
// };
//   useEffect(() => {
//     fetchCounts();
//     fetchUsers();
//     getDepartments().then(setDepartments);
//   }, []);

//   const handleDepartmentChange = async (deptId) => {
//     setForm({ ...form, department_id: deptId, designation_id: "" });
//     const data = await getDesignationsByDept(deptId);
//     setDesignations(data);
//   };

//   // Enhanced form submission with salary
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = {
//         username: form.name,
//         email: form.email,
//         password: "welcome@123",
//         role_name: form.role,
//         department_id: form.department_id,
//         designation_id: form.designation_id,
//         date_of_joining: form.date_of_joining,
//         base_salary: parseFloat(form.base_salary) || 0, // Include salary
//       };

//       await addUser(userData);
//       alert("User added successfully with salary information");
      
//       setForm({
//         name: "",
//         email: "",
//         role: "Employee",
//         password: "",
//         department_id: "",
//         designation_id: "",
//         date_of_joining: "",
//         base_salary: "",
//       });
      
//       fetchCounts();
//       fetchUsers();
//     } catch (err) {
//       console.error("Error adding user:", err);
//       alert("Failed to add user: " + (err.error || "Unknown error"));
//     }
//   };

//   // Handle salary update
//   const handleSalaryUpdate = async (userId) => {
//     try {
//       const salary = parseFloat(newSalary);
//       if (isNaN(salary) || salary < 0) {
//         alert("Please enter a valid positive salary amount");
//         return;
//       }

//       await updateUserSalary(userId, salary);
//       alert("Salary updated successfully");
      
//       // Update local state
//       setUsers(prev => prev.map(user => 
//         user.id === userId ? { ...user, base_salary: salary } : user
//       ));
      
//       setEditingSalary(null);
//       setNewSalary("");
//     } catch (err) {
//       console.error("Error updating salary:", err);
//       alert("Failed to update salary: " + (err.error || "Unknown error"));
//     }
//   };

//   // Format currency for display
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
//         <h2 className="text-2xl font-bold text-gray-800 mb-8">SuperAdmin</h2>
//         <nav className="flex-1 space-y-3">
//           <button
//             onClick={() => setActiveTab("dashboard")}
//             className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
//               activeTab === "dashboard"
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             <LayoutDashboard className="mr-2 h-5 w-5" />
//             Dashboard
//           </button>
//           <button
//             onClick={() => setActiveTab("addUser")}
//             className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
//               activeTab === "addUser"
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             <UserPlus className="mr-2 h-5 w-5" />
//             Add User
//           </button>
//           <button
//             onClick={() => setActiveTab("manageUsers")}
//             className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
//               activeTab === "manageUsers"
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             <Users className="mr-2 h-5 w-5" />
//             Manage Users
//           </button>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center px-4 py-2 mt-auto text-red-600 hover:bg-gray-100 rounded-lg"
//         >
//           <LogOut className="mr-2 h-5 w-5" />
//           Logout
//         </button>
//       </aside>

//       {/* Main Section */}
//       <main className="flex-1 flex flex-col">
//         {/* Topbar */}
//         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
//           <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
//           <div className="flex items-center gap-3">
//             <UserCircle className="h-8 w-8 text-gray-500" />
//             <span className="font-medium text-gray-800">SuperAdmin</span>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="p-8 flex-1 overflow-y-auto">
//           {/* Dashboard */}
//           {activeTab === "dashboard" && (
//             <div>
//               <h1 className="text-3xl font-semibold mb-2">
//                 Welcome back, SuperAdmin
//               </h1>
//               <p className="text-gray-600 mb-6">
//                 Manage HR, Managers, and Employees here.
//               </p>

//               <div className="grid grid-cols-3 gap-6">
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow p-6 rounded-xl text-center">
//                   <Shield className="h-8 w-8 mx-auto mb-2" />
//                   <h2 className="text-2xl font-bold">{counts.HR}</h2>
//                   <p>HR Users</p>
//                 </div>
//                 <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow p-6 rounded-xl text-center">
//                   <Briefcase className="h-8 w-8 mx-auto mb-2" />
//                   <h2 className="text-2xl font-bold">{counts.Manager}</h2>
//                   <p>Managers</p>
//                 </div>
//                 <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow p-6 rounded-xl text-center">
//                   <Users className="h-8 w-8 mx-auto mb-2" />
//                   <h2 className="text-2xl font-bold">{counts.Employee}</h2>
//                   <p>Employees</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add User with Salary */}
//           {activeTab === "addUser" && (
//             <div className="bg-white shadow-md p-8 rounded-xl max-w-2xl">
//               <h2 className="text-2xl font-semibold mb-6 flex items-center">
//                 <UserPlus className="mr-2 h-6 w-6" />
//                 Add New User
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     required
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
//                     value={form.role}
//                     onChange={(e) => setForm({ ...form, role: e.target.value })}
//                     required
//                   >
//                     <option value="HR">HR</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Employee">Employee</option>
//                   </select>

//                   {/* Salary Input */}
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     <input
//                       type="number"
//                       placeholder="Base Salary (INR)"
//                       min="0"
//                       step="1000"
//                       className="w-full border rounded-lg pl-10 pr-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
//                       value={form.base_salary}
//                       onChange={(e) => setForm({ ...form, base_salary: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     value={form.department_id}
//                     onChange={(e) => handleDepartmentChange(e.target.value)}
//                     className="w-full border rounded-lg px-4 py-2"
//                   >
//                     <option value="">Select Department</option>
//                     {departments.map((d) => (
//                       <option key={d.id} value={d.id}>
//                         {d.name}
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     value={form.designation_id}
//                     onChange={(e) =>
//                       setForm({ ...form, designation_id: e.target.value })
//                     }
//                     className="w-full border rounded-lg px-4 py-2"
//                     disabled={!form.department_id}
//                   >
//                     <option value="">Select Designation</option>
//                     {designations.map((d) => (
//                       <option key={d.id} value={d.id}>
//                         {d.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <input
//                   type="date"
//                   value={form.date_of_joining}
//                   onChange={(e) =>
//                     setForm({ ...form, date_of_joining: e.target.value })
//                   }
//                   className="w-full border rounded-lg px-4 py-2"
//                 />

//                 <input
//                   type="password"
//                   placeholder="Default Password: welcome@123"
//                   className="w-full border rounded-lg px-4 py-2 shadow-sm bg-gray-50"
//                   value="welcome@123"
//                   disabled
//                 />

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium"
//                 >
//                   Create User with Salary
//                 </button>
//               </form>
//             </div>
//           )}

//           {/* Enhanced Manage Users with Salary */}
//           {activeTab === "manageUsers" && (
//             <div>
//               <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

//               {/* Role Tabs */}
//               <div className="flex space-x-4 mb-6">
//                 {["HR", "Manager", "Employee"].map((role) => (
//                   <button
//                     key={role}
//                     onClick={() => setSelectedRole(role)}
//                     className={`px-4 py-2 rounded-lg font-medium transition ${
//                       selectedRole === role
//                         ? "bg-blue-600 text-white shadow-md"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                   >
//                     {role}
//                   </button>
//                 ))}
//               </div>

//               {/* User Table with Salary */}
//               <div className="bg-white shadow-md rounded-xl overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-100 text-gray-600">
//                     <tr>
//                       <th className="py-3 px-4 text-left">ID</th>
//                       <th className="py-3 px-4 text-left">Name</th>
//                       <th className="py-3 px-4 text-left">Email</th>
//                       <th className="py-3 px-4 text-left">Role</th>
//                       <th className="py-3 px-4 text-left">Salary</th>
//                       <th className="py-3 px-4 text-left">Must Reset</th>
//                       <th className="py-3 px-4 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users
//                       .filter((user) => user.role === selectedRole)
//                       .map((user) => (
//                         <tr key={user.id} className="border-t hover:bg-gray-50">
//                           <td className="py-3 px-4">{user.id}</td>
//                           <td className="py-3 px-4">{user.name}</td>
//                           <td className="py-3 px-4">{user.email}</td>
//                           <td className="py-3 px-4">
//                             <span className="px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full">
//                               {user.role}
//                             </span>
//                           </td>
//                           <td className="py-3 px-4">
//                             {editingSalary === user.id ? (
//                               <div className="flex items-center space-x-2">
//                                 <input
//                                   type="number"
//                                   value={newSalary}
//                                   onChange={(e) => setNewSalary(e.target.value)}
//                                   className="w-24 border rounded px-2 py-1 text-sm"
//                                   placeholder="Salary"
//                                 />
//                                 <button
//                                   onClick={() => handleSalaryUpdate(user.id)}
//                                   className="text-green-600 hover:underline text-sm"
//                                 >
//                                   Save
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setEditingSalary(null);
//                                     setNewSalary("");
//                                   }}
//                                   className="text-red-600 hover:underline text-sm"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="flex items-center space-x-2">
//                                 <span className="font-medium text-green-600">
//                                   {formatCurrency(user.base_salary)}
//                                 </span>
//                                 <button
//                                   onClick={() => {
//                                     setEditingSalary(user.id);
//                                     setNewSalary(user.base_salary?.toString() || "");
//                                   }}
//                                   className="text-blue-600 hover:bg-blue-100 p-1 rounded"
//                                 >
//                                   <Edit className="h-4 w-4" />
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                           <td className="py-3 px-4">
//                             {user.must_reset ? (
//                               <span className="text-red-600 font-medium">True</span>
//                             ) : (
//                               <span className="text-green-600 font-medium">False</span>
//                             )}
//                           </td>
//                           <td className="py-3 px-4 space-x-3">
//                             <button className="text-blue-600 hover:underline">Edit</button>
//                             <button className="text-red-600 hover:underline">Delete</button>
//                             <button
//                               className="text-orange-600 hover:underline"
//                               onClick={async () => {
//                                 try {
//                                   const res = await resetUserPassword(user.id);
//                                   alert(res.message);
//                                   setUsers((prev) =>
//                                     prev.map((u) => (u.id === user.id ? res.user : u))
//                                   );
//                                 } catch (err) {
//                                   alert(err.error || "Failed to reset password");
//                                 }
//                               }}
//                             >
//                               Reset Password
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default SuperAdminDashboard;


import { useState, useEffect } from "react";
import { LayoutDashboard, UserPlus, Users, LogOut, UserCircle, Briefcase, Shield, DollarSign, Edit } from "lucide-react";
import { addUser, getUserCounts, getAllUsers, resetUserPassword, updateUserSalary } from "../../api/userApi";
import { getDepartments, getDesignationsByDept } from "../../api/HR/departmentApi";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

function SuperAdminDashboard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee",
    password: "",
    department_id: "",
    designation_id: "",
    date_of_joining: "",
    base_salary: "",
  });

  const [counts, setCounts] = useState({ HR: 0, Manager: 0, Employee: 0 });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("HR");

  const [editingSalary, setEditingSalary] = useState(null);
  const [newSalary, setNewSalary] = useState("");

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const navigate = useNavigate();
   const { signOut } = useClerk();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   sessionStorage.clear();
  //   navigate("/");
  // };


  //   const handleLogout = async () => {
  //   try {
  //     await signOut();
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("role");
  //     localStorage.removeItem("user");
  //     sessionStorage.clear();
  //     navigate("/role-select");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

    const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");
      
      // Clear all storage first
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Clerk
      await signOut();
      
      console.log("✅ Signed out, redirecting...");
      
      // Hard redirect (this WILL work)
      window.location.href = "/role-select";
    } catch (error) {
      console.error("❌ Logout error:", error);
      // Even on error, redirect
      window.location.href = "/role-select";
    }
  };

  const fetchCounts = async () => {
    try {
      const data = await getUserCounts();
      setCounts(data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      console.log("🔄 Calling getAllUsers API...");
      const data = await getAllUsers();
      console.log("📊 Fetched users data:", data);
      console.log("📊 First user:", data[0]);
      console.log("📊 First user keys:", data[0] ? Object.keys(data[0]) : "No users");
      setUsers(data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchUsers();
    getDepartments().then(setDepartments);
  }, []);

  const handleDepartmentChange = async (deptId) => {
    setForm({ ...form, department_id: deptId, designation_id: "" });
    const data = await getDesignationsByDept(deptId);
    setDesignations(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: form.name,
        email: form.email,
        password: "welcome@123",
        role_name: form.role,
        department_id: form.department_id,
        designation_id: form.designation_id,
        date_of_joining: form.date_of_joining,
        base_salary: parseFloat(form.base_salary) || 0,
      };

      await addUser(userData);
      alert("User added successfully with salary information");
      
      setForm({
        name: "",
        email: "",
        role: "Employee",
        password: "",
        department_id: "",
        designation_id: "",
        date_of_joining: "",
        base_salary: "",
      });
      
      fetchCounts();
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user: " + (err.error || "Unknown error"));
    }
  };

  const handleSalaryUpdate = async (userId) => {
    try {
      const salary = parseFloat(newSalary);
      if (isNaN(salary) || salary < 0) {
        alert("Please enter a valid positive salary amount");
        return;
      }

      await updateUserSalary(userId, salary);
      alert("Salary updated successfully");
      
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, base_salary: salary } : user
      ));
      
      setEditingSalary(null);
      setNewSalary("");
    } catch (err) {
      console.error("Error updating salary:", err);
      alert("Failed to update salary: " + (err.error || "Unknown error"));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">SuperAdmin</h2>
          <p className="text-xs text-gray-400">System Administrator</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "dashboard"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("addUser")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "addUser"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <UserPlus className="mr-3 h-5 w-5" />
            <span className="font-medium">Add User</span>
          </button>
          <button
            onClick={() => setActiveTab("manageUsers")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "manageUsers"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <Users className="mr-3 h-5 w-5" />
            <span className="font-medium">Manage Users</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-gray-900/30 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">SuperAdmin</p>
              <p className="text-xs text-gray-400">Full Access</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, SuperAdmin
                </h1>
                <p className="text-gray-400">
                  Manage HR, Managers, and Employees from your dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-10 w-10 opacity-80" />
                    <div className="text-right">
                      <h2 className="text-4xl font-bold">{counts.HR}</h2>
                      <p className="text-blue-100 text-sm">Total</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">HR Users</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Briefcase className="h-10 w-10 opacity-80" />
                    <div className="text-right">
                      <h2 className="text-4xl font-bold">{counts.Manager}</h2>
                      <p className="text-green-100 text-sm">Total</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">Managers</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-10 w-10 opacity-80" />
                    <div className="text-right">
                      <h2 className="text-4xl font-bold">{counts.Employee}</h2>
                      <p className="text-purple-100 text-sm">Total</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">Employees</p>
                </div>
              </div>
            </div>
          )}

          {/* Add User with Salary */}
          {activeTab === "addUser" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <UserPlus className="mr-3 h-6 w-6" />
                  Add New User
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      required
                    >
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>

                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Base Salary (INR)"
                        min="0"
                        step="1000"
                        className="bg-gray-700/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                        value={form.base_salary}
                        onChange={(e) => setForm({ ...form, base_salary: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      value={form.department_id}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={form.designation_id}
                      onChange={(e) =>
                        setForm({ ...form, designation_id: e.target.value })
                      }
                      className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                      disabled={!form.department_id}
                    >
                      <option value="">Select Designation</option>
                      {designations.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="date"
                    value={form.date_of_joining}
                    onChange={(e) =>
                      setForm({ ...form, date_of_joining: e.target.value })
                    }
                    className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white"
                  />

                  <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-400">
                      Default Password: <span className="text-white font-mono">welcome@123</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150"
                  >
                    Create User with Salary
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Enhanced Manage Users with Salary */}
          {activeTab === "manageUsers" && (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">Manage Users</h2>
                <p className="text-gray-400 text-sm">View and manage all system users</p>
              </div>

              {/* Role Tabs */}
              <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
                {["HR", "Manager", "Employee"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                      selectedRole === role
                        ? "bg-white text-gray-900 shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* User Table with Salary */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                {users.filter((user) => user.role === selectedRole).length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500">No {selectedRole} users found</p>
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
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Salary
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Must Reset
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700/50">
                        {users
                          .filter((user) => user.role === selectedRole)
                          .map((user) => (
                            <tr key={user.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                              <td className="px-6 py-4 text-sm text-gray-300">{user.id}</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">{user.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {editingSalary === user.id ? (
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="number"
                                      value={newSalary}
                                      onChange={(e) => setNewSalary(e.target.value)}
                                      className="w-28 bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                                      placeholder="Salary"
                                    />
                                    <button
                                      onClick={() => handleSalaryUpdate(user.id)}
                                      className="text-green-400 hover:text-green-300 text-sm font-medium"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingSalary(null);
                                        setNewSalary("");
                                      }}
                                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-green-400">
                                      {formatCurrency(user.base_salary)}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setEditingSalary(user.id);
                                        setNewSalary(user.base_salary?.toString() || "");
                                      }}
                                      className="text-blue-400 hover:bg-blue-500/20 p-1 rounded transition-colors duration-150"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {user.must_reset ? (
                                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold border border-red-500/30">
                                    True
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold border border-green-500/30">
                                    False
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                                    Edit
                                  </button>
                                  <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                                    Delete
                                  </button>
                                  <button
                                    className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                                    onClick={async () => {
                                      try {
                                        const res = await resetUserPassword(user.id);
                                        alert(res.message);
                                        setUsers((prev) =>
                                          prev.map((u) => (u.id === user.id ? res.user : u))
                                        );
                                      } catch (err) {
                                        alert(err.error || "Failed to reset password");
                                      }
                                    }}
                                  >
                                    Reset
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SuperAdminDashboard;
