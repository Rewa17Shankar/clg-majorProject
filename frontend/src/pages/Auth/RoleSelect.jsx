// import { useState } from "react";
// import { useAuthContext } from "../../context/AuthContext";
// import { useUser } from "@clerk/clerk-react"; 
// import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../../hooks/useAuth";

// const RoleSelect = () => {
//   const { setRole, setUser } = useAuthContext();
//   const { user: clerkUser } = useUser(); 
//   const [selectedRole, setSelectedRole] = useState("");
//   const navigate = useNavigate();

//   // const handleConfirm = () => {
//   //   if (selectedRole) {
//   //     setRole(selectedRole);
//   //     setUser({
//   //       username: clerkUser?.fullName || clerkUser?.primaryEmailAddress?.emailAddress,
//   //     });

//   //     if (selectedRole === "superadmin") {
//   //       navigate("/admin"); // Clerk login for superadmin
//   //     } else {
//   //       navigate("/login"); // Custom login for other roles
//   //     }
//   //   }
//   // };


//   const handleConfirm = () => {
//   if (selectedRole) {
//     setRole(selectedRole);
//     setUser({
//       username: clerkUser?.fullName || clerkUser?.primaryEmailAddress?.emailAddress,
//     });

//     // ✅ persist role and user
//     localStorage.setItem("role", selectedRole);
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         username: clerkUser?.fullName || clerkUser?.primaryEmailAddress?.emailAddress,
//       })
//     );

//     if (selectedRole === "superadmin") {
//       navigate("/admin");
//     } else if (selectedRole === "hr") {
//       navigate("/login"); 
//     } else {
//       navigate("/login");
//     }
//   }
// };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px]">
//         <h2 className="text-xl font-bold mb-2 text-gray-800">
//           Hello, {clerkUser?.fullName || clerkUser?.primaryEmailAddress?.emailAddress || "Guest"} 👋
//         </h2>
//         <p className="text-gray-600 mb-6">Select your role to continue</p>

//         <select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="">-- Choose Role --</option>
//           <option value="superadmin">Super Admin</option>
//           <option value="hr">HR</option>
//           <option value="manager">Manager</option>
//           <option value="employee">Employee</option>
//         </select>

//         <button
//           onClick={handleConfirm}
//           disabled={!selectedRole}
//           className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:bg-gray-300"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoleSelect;




import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Briefcase, UserCog } from "lucide-react";

const RoleSelect = () => {
  const { setRole } = useAuthContext();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === "superadmin") {
      // SuperAdmin → Direct to Clerk authentication
      navigate("/admin");
    } else {
      // Other roles → Store role and go to login
      setRole(selectedRole);
      localStorage.setItem("role", selectedRole);
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-5xl w-full px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to OnBoard-X
          </h1>
          <p className="text-xl text-gray-300">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* SuperAdmin Card */}
          <button
            onClick={() => handleRoleSelect("superadmin")}
            className="group bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-8 text-white shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-500/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/20 rounded-full p-6 group-hover:bg-white/30 transition-all">
                <Shield className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold">SuperAdmin</h2>
              <p className="text-sm text-white/80 text-center">
                Full system control with Clerk authentication
              </p>
            </div>
          </button>

          {/* HR Card */}
          <button
            onClick={() => handleRoleSelect("hr")}
            className="group bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-blue-500/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/20 rounded-full p-6 group-hover:bg-white/30 transition-all">
                <UserCog className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold">HR</h2>
              <p className="text-sm text-white/80 text-center">
                Manage employees and departments
              </p>
            </div>
          </button>

          {/* Manager Card */}
          <button
            onClick={() => handleRoleSelect("manager")}
            className="group bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-green-500/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/20 rounded-full p-6 group-hover:bg-white/30 transition-all">
                <Briefcase className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold">Manager</h2>
              <p className="text-sm text-white/80 text-center">
                Oversee team operations
              </p>
            </div>
          </button>

          {/* Employee Card */}
          <button
            onClick={() => handleRoleSelect("employee")}
            className="group bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-8 text-white shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/20 rounded-full p-6 group-hover:bg-white/30 transition-all">
                <Users className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold">Employee</h2>
              <p className="text-sm text-white/80 text-center">
                Access your dashboard
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
