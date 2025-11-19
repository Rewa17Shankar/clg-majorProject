// // import { createContext, useState, useContext } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [role, setRole] = useState(null);
// //   const [user, setUser] = useState(null);

// //   return (
// //     <AuthContext.Provider value={{ role, setRole, user, setUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuthContext = () => useContext(AuthContext);












// // import { createContext, useContext, useState, useEffect } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [role, setRole] = useState(null);
// //   const [user, setUser] = useState(null);

// //   // ✅ restore from localStorage on app load
// //   useEffect(() => {
// //     const storedRole = localStorage.getItem("role");
// //     const storedUser = localStorage.getItem("user");

// //     if (storedRole) setRole(storedRole);
// //     if (storedUser) setUser(JSON.parse(storedUser));
// //   }, []);

// //   // ✅ keep syncing updates to localStorage
// //   useEffect(() => {
// //     if (role) localStorage.setItem("role", role);
// //   }, [role]);

// //   useEffect(() => {
// //     if (user) localStorage.setItem("user", JSON.stringify(user));
// //   }, [user]);

// //   return (
// //     <AuthContext.Provider value={{ role, setRole, user, setUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuthContext = () => useContext(AuthContext);



// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));

//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setRole("");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, role, setRole, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Add this named export
// export const useAuthContext = () => useContext(AuthContext);


///updated
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Load from localStorage on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setRole(userData.roleId);
      }
    } catch (err) {
      localStorage.clear();
    }
    setLoading(false);
  }, []);

const login = (userData) => {
  setUser(userData);
  setRole(userData.roleId);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", userData.token);   // ⭐ ADD THIS
};


  const logout = () => {
    setUser(null);
    setRole("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
