import axios from "axios";

const API = "http://localhost:5000/api/hr/employees";
// const API = "https://clg-majorprojrct.onrender.com/api/employees";
export const fetchEmployees = () => axios.get(API);
export const fetchEmployee = (id) => axios.get(`${API}/${id}`);
export const addEmployee = (data) => axios.post(API, data);
export const updateEmployee = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API}/${id}`);
