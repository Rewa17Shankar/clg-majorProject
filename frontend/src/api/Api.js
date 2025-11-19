// // src/api/Api.js
// const BASE_URL = "http://localhost:5000/api";
// // const BASE_URL = "https://clg-majorprojrct.onrender.com/api";

// async function request(path, opts = {}) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...opts.headers,
//     },
//     ...opts,
//   });

//   if (!res.ok) {
//     throw new Error(`API error: ${res.status}`);
//   }

//   return res.json();
// }

// export default request; // 👈 make sure this is there

//updated
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token
API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      const token = parsed?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
