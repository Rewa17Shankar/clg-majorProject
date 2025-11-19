import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/attendance";
const  BASE_URL = "https://clg-majorprojrct.onrender.com/api/attendance"
export const clockInAPI = (user_id) => axios.post(`${BASE_URL}/clock-in`, { user_id });
export const clockOutAPI = (user_id) => axios.post(`${BASE_URL}/clock-out`, { user_id });
export const getAttendanceAPI = (user_id) => axios.get(`${BASE_URL}/employee/${user_id}`);
export const getPayrollSummaryAPI = () => axios.get(`${BASE_URL}/hr/payroll-summary`);
