import axios from "axios";

// const API = "http://localhost:5000/api/users";
const API = "https://clg-majorprojrct.onrender.com/api/users";

// export const updateUserDepartment = async (userId, departmentId) => {
//   const res = await axios.put(`${API}/update-department`, {
//     userId,
//     departmentId,
//   });
//   return res.data;
// };

// export const updateUserDepartment = async (userId, departmentId) => {
//   const res = await axios.patch(`${API}/${userId}/department`, { 
//     department_id: departmentId 
//   });
//   return res.data;
// };

// export const updateUserDesignation = async (id, designationId) => {
//   const res = await axios.put(`${API}/${id}/designation`, { designationId });
//   return res.data;
// };

export const updateUserDepartment = async (userId, departmentId) => {
  const res = await axios.patch(`${API}/${userId}/department`, { 
    department_id: departmentId 
  });
  return res.data;
};

export const updateUserDesignation = async (userId, designationId) => {
  const res = await axios.patch(`${API}/${userId}/designation`, { 
    designation_id: designationId 
  });
  return res.data;
};

// New function to update user salary
export const updateUserSalary = async (userId, newSalary) => {
  try {
    const res = await axios.put(`${API}/update-salary`, {
      userId,
      newSalary,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Something went wrong" };
  }
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// Fetch profile details with salary
export const getUserProfile = async (userId) => {
  try {
    const res = await axios.get(`${API}/${userId}/profile`);
    return res.data; // { id, username, email, role, base_salary }
  } catch (err) {
    throw err.response?.data || { error: "Something went wrong" };
  }
};

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API}/login`, { username, password });
  return res.data;
};
// export const loginUser = (email, password, role) =>
//   axios.post(`${API_URL}/login`, { email, password, role }, console.log("Login attempt:", { email, role }));

export const updatePassword = async (userId, newPassword) => {
  const res = await axios.post(`${API}/update-password`, { userId, newPassword });
  return res.data;
};

// export const getAllUsers = async () => {
//   const res = await axios.get(API);
//   return res.data;
// };
export const getAllUsers = async () => {
  console.log("📡 API Call: GET", API);
  const res = await axios.get(API);
  console.log("📡 API Response:", res.data);
  return res.data;
};

// Reset password API
export const resetUserPassword = async (userId) => {
  try {
    const res = await axios.post(`${API}/${userId}/reset`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Something went wrong" };
  }
};

// Enhanced addUser with salary
export const addUser = async (userData) => {
  try {
    const res = await axios.post(`${API}/add`, userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Something went wrong" };
  }
};

export const getUserCounts = async () => {
  try {
    const res = await axios.get(`${API}/counts`);
    return res.data; // { HR: x, Manager: y, Employee: z }
  } catch (err) {
    throw err.response?.data || { error: "Something went wrong" };
  }
};


