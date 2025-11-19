import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";
const API_URL = "https://clg-majorprojrct.onrender.com/api/auth";
export const loginUser = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password });
// export const loginUser = (email, password, role) =>
//   axios.post(`${API_URL}/login`, { email, password, role },
//     console.log("Login attempt:", { email, role })
//   );

export const resetPassword = (userId, newPassword) =>
  axios.post(`${API_URL}/reset-password`, { userId, newPassword });

export const superadminLogin = (email) =>
  axios.post(`${API_URL}/superadmin-login`, { email });
