import axios from "axios";

const API = "http://localhost:5000/api/recruitment";
// const API = "https://clg-majorprojrct.onrender.com/api/recruitment";
export const getJobs = () => axios.get(`${API}/jobs`);
export const createJob = (data) => axios.post(`${API}/jobs`, data);

export const getApplicants = (jobId) => axios.get(`${API}/jobs/${jobId}/applicants`);
export const applyJob = (data) => axios.post(`${API}/applicants`, data);
export const updateApplicantStatus = (id, status) =>
  axios.put(`${API}/applicants/${id}/status`, { status });
