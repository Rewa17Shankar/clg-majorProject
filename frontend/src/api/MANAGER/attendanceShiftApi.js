// /frontend/src/api/attendanceShiftApi.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://clg-majorprojrct.onrender.com/api";
// 
export const getAttendanceShift = async () => {
  const res = await axios.get(`${API_URL}/attendance-shift`, { withCredentials: true });
  return res.data;
};
