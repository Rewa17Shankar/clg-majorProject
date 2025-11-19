// import { useState } from "react";
// import { useAuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { User, Lock } from "lucide-react";
// import { loginUser } from "../../api/userApi";

// const Login = () => {
//   const { role, setUser } = useAuthContext();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   if (!username || !password) return alert("Enter username & password");

//   //   try {
//   //     const res = await loginUser(username, password);

//   //     if (res.mustReset) {
//   //       navigate(`/reset-password/${res.userId}`);
//   //     } else {
//   //       // ✅ include userId also in auth context
//   //       console.log('📥 Login Response:', res);
//   //     console.log('roleId:', res.roleId, 'Type:', typeof res.roleId);
//   //       setUser({
//   //         userId: res.userId,
//   //         username: res.username,
//   //         roleId: res.roleId,
//   //          token: res.token,
//   //       });

//   //       // ✅ store in localStorage (optional)
//   //       localStorage.setItem(
//   //         "user",
//   //         JSON.stringify({
//   //           userId: res.userId,
//   //           username: res.username,
//   //           roleId: res.roleId,
//   //           token: res.token,
//   //         })
//   //       );

//   //       navigate("/dashboard");
//   //     }
//   //   } catch (err) {
//   //     alert(err.error || "Login failed");
//   //   }
//   // };

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   if (!username || !password) return alert("Enter username & password");

//   try {
//     const res = await loginUser(username, password);

//     if (res.mustReset) {
//       navigate(`/reset-password/${res.userId}`);
//     } else {
//       // ✅ DEBUG: Check kya mil raha hai
//       console.log('📥 Login Response:', res);
//       console.log('roleId:', res.roleId, 'Type:', typeof res.roleId);
      
//       // const userData = {
//       //   userId: res.userId,
//       //   username: res.username,
//       //   roleId: res.roleId,  // Make sure this is a NUMBER not string
//       //   token: res.token,
//       // };
      
//       // console.log('💾 Storing in localStorage:', userData);
      
//       // // Store in context
//       // setUser(userData);

//       // // Store in localStorage
//       // localStorage.setItem('user', JSON.stringify(userData));

//       const userData = {
//   userId: res.userId,
//   username: res.username,
//   roleId: res.roleId,
//   token: res.token,
// };

// setUser(userData);

// localStorage.setItem("user", JSON.stringify(userData));
// localStorage.setItem("token", res.token);   // ⭐ NEW

      
//       // Verify storage
//       const stored = JSON.parse(localStorage.getItem('user'));
//       console.log('✅ Verified stored data:', stored);

//       navigate("/dashboard");
//     }
//   } catch (err) {
//     // THIS IS THE KEY PART - Log everything
//     console.error("❌ Full Error Object:", err);
//     console.error("❌ Error Response:", err.response);
//     console.error("❌ Error Response Data:", err.response?.data);
//     console.error("❌ Error Response Status:", err.response?.status);
    
//     // Show alert with actual error
//     const serverError = err.response?.data?.error 
//       || err.response?.data?.message 
//       || err.response?.data 
//       || err.message;
    
//     alert(`Login Failed: ${JSON.stringify(serverError)}`);
//   }
// };

//   if (!role) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
//         <p className="text-xl font-semibold text-white drop-shadow-lg animate-pulse">
//           Please select a role first!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
//       <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-96 flex flex-col gap-6">
//         <h1 className="text-3xl font-extrabold text-center text-white drop-shadow tracking-wide">
//           Login as {role.toUpperCase()}
//         </h1>

//         <form onSubmit={handleLogin} className="flex flex-col gap-5">
//           <div className="flex items-center gap-3 p-3 rounded-xl border bg-white/20 text-white">
//             <User className="w-5 h-5 text-white/70" />
//             <input
//               type="text"
//               placeholder="Username"
//               className="bg-transparent outline-none flex-1 placeholder-white/60 text-white"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-3 p-3 rounded-xl border bg-white/20 text-white">
//             <Lock className="w-5 h-5 text-white/70" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="bg-transparent outline-none flex-1 placeholder-white/60 text-white"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;





import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { loginUser } from "../../api/userApi";

const Login = () => {
  const { role, setUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) return alert("Enter username & password");

    try {
      const res = await loginUser(username, password);

      console.log("📥 LOGIN RESPONSE:", res);

      // ================================
      // 🔥 Decode token to extract real ID
      // ================================
      let decoded = {};
      try {
        decoded = JSON.parse(atob(res.token.split(".")[1]));
      } catch (e) {
        console.log("JWT decode error:", e);
      }

      const finalId =
        decoded.id ||
        decoded.userId ||
        decoded.uid ||
        decoded.sub ||
        res.userId;

      // ================================
      // 🔥 Store Correct User Data
      // ================================
const userData = {
  id: finalId,
  userId: finalId,
  username: res.username,
  roleId: Number(res.roleId),
  role: role,
  token: res.token,
};

setUser(userData);

localStorage.setItem("user", JSON.stringify(userData));
localStorage.setItem("token", userData.token);
  // ⭐ REQUIRED


      // ================================
      // 🔥 REDIRECT BASED ON ROLE
      // ================================
if (role === "admin") navigate("/admin");
else if (role === "hr") navigate("/hr");
else if (role === "manager") navigate("/manager");
else navigate("/employee");

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  if (!role) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-xl font-semibold text-white">
          Please select a role first!
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-96 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-center text-white">
          Login as {role.toUpperCase()}
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex items-center gap-3 p-3 rounded-xl border bg-white/20 text-white">
            <User className="w-5 h-5 text-white/70" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none flex-1 placeholder-white/60 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border bg-white/20 text-white">
            <Lock className="w-5 h-5 text-white/70" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-1 placeholder-white/60 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
