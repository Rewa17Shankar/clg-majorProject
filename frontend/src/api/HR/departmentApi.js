// // import axios from "axios";

// // const API = "http://localhost:5000/api/departments";
// // // const API = "https://clg-majorprojrct.onrender.com/api/departments";
// // export const getDepartments = async () => {
// //   const res = await axios.get(API);
// //   return res.data;
// // };

// // export const addDepartment = async (department_name) => {
// //   const res = await axios.post(API, { department_name });
// //   return res.data;
// // };

// // export const getDesignationsByDept = async (deptId) => {
// //   const res = await axios.get(`${API}/${deptId}/designations`);
// //   return res.data;
// // };



// // api/HR/departmentApi.js
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/departments";

// // Get all departments
// export const getDepartments = async () => {
//   const res = await axios.get(API_URL);
//   return res.data;
// };

// // ✅ Get users with their department names
// export const getUsersWithDepartments = async () => {
//   const res = await axios.get(`${API_URL}/users-with-departments`);
//   return res.data;
// };

// // ✅ Add this function - Get designations by department ID
// export const getDesignationsByDept = async (deptId) => {
//   const res = await axios.get(`${API_URL}/${deptId}/designations`);
//   return res.data;
// };

// // Add new department
// export const addDepartment = async (departmentName) => {
//   const res = await axios.post(API_URL, { department_name: departmentName });
//   return res.data;
// };

// // Update department
// export const updateDepartment = async (id, departmentName) => {
//   const res = await axios.put(`${API_URL}/${id}`, { department_name: departmentName });
//   return res.data;
// };

// // Delete department
// export const deleteDepartment = async (id) => {
//   const res = await axios.delete(`${API_URL}/${id}`);
//   return res.data;
// };



import axios from "axios";

const API = "http://localhost:5000/api/departments";
// const API = "https://clg-majorprojrct.onrender.com/api/departments";

export const getDepartments = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addDepartment = async (department_name) => {
  const res = await axios.post(API, { department_name });
  return res.data;
};

export const updateDepartment = async (id, department_name) => {
  const res = await axios.put(`${API}/${id}`, { department_name });
  return res.data;
};

export const deleteDepartment = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export const getDesignationsByDept = async (deptId) => {
  const res = await axios.get(`${API}/${deptId}/designations`);
  return res.data;
};
