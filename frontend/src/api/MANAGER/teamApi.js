// // frontend/src/api/teamApi.js
// import axios from "axios";

// // const API_URL = "http://localhost:5000/api/teams"; 
// const API_URL = "https://clg-majorprojrct.onrender.com/api/teams"; 

// // Get all teams
// export const getTeams = async () => {
//   const res = await axios.get(API_URL);
//   return res.data;
// };

// // Create a new team
// export const createTeam = async (teamData) => {
//   const res = await axios.post(API_URL, teamData);
//   return res.data;
// };

// // Add a team member
// export const addTeamMember = async (teamId, userId, role = "Member") => {
//   const res = await axios.post(`${API_URL}/${teamId}/members`, {
//     userId,
//     role,
//   });
//   return res.data;
// };

// // Remove a team member
// export const removeTeamMember = async (teamId, userId) => {
//   const res = await axios.delete(`${API_URL}/${teamId}/members/${userId}`);
//   return res.data;
// };

// // Assign a task to a team
// export const assignTask = async (taskData) => {
//   const res = await axios.post(`${API_URL}/tasks`, taskData);
//   return res.data;
// };

// // Get all tasks of a team
// export const getTasksByTeam = async (teamId) => {
//   const res = await axios.get(`${API_URL}/${teamId}/tasks`);
//   return res.data;
// };

// // Get all users (for member selection)
// export const getUsers = async () => {
//   const res = await axios.get(`${API_URL}/users/all`);
//   return res.data;
// };


// // frontend/src/api/MANAGER/teamApi.js
// import axios from "axios";

// // ✅ LOCAL BACKEND (CORRECT)
// const API_URL = "http://localhost:5000/api/teams"; 

// // ❌ REMOVE THIS (DEPLOYED - OLD)
// // const API_URL = "https://clg-majorprojrct.onrender.com/api/teams";

// // Get all teams
// export const getTeams = async () => {
//   try {
//     const res = await axios.get(API_URL);
//     return res.data.data || [];
//   } catch (err) {
//     console.error("Error fetching teams:", err);
//     throw err;
//   }
// };

// // Create a new team
// export const createTeam = async (teamData) => {
//   try {
//     const res = await axios.post(API_URL, teamData);
//     return res.data.data;
//   } catch (err) {
//     console.error("Error creating team:", err);
//     throw err;
//   }
// };

// // Add a team member
// export const addTeamMember = async (teamId, userId, role = "Member") => {
//   try {
//     const res = await axios.post(`${API_URL}/${teamId}/members`, {
//       userId,
//       role,
//     });
//     return res.data.data;
//   } catch (err) {
//     console.error("Error adding member:", err);
//     throw err;
//   }
// };

// // Remove a team member
// export const removeTeamMember = async (teamId, userId) => {
//   try {
//     const res = await axios.delete(`${API_URL}/${teamId}/members/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error("Error removing member:", err);
//     throw err;
//   }
// };

// // Assign a task to a team
// export const assignTask = async (taskData) => {
//   try {
//     const res = await axios.post(
//       `${API_URL}/${taskData.team_id}/tasks`,
//       taskData
//     );
//     return res.data.data;
//   } catch (err) {
//     console.error("Error assigning task:", err);
//     throw err;
//   }
// };

// // Get all tasks of a team
// export const getTasksByTeam = async (teamId) => {
//   try {
//     const res = await axios.get(`${API_URL}/${teamId}/tasks`);
//     return res.data.data || [];
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     throw err;
//   }
// };

// // Get all users (for member selection)
// export const getUsers = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/users/all`);
//     return res.data.data || [];
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     throw err;
//   }
// };

import axios from "axios";

// const API_URL = "http://localhost:5000/api/teams";
const API_URL = "https://clg-majorproject-oab0.onrender.com/api/teams"
// Get all teams
export const getTeams = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.teams || res.data.data || []; // FIXED
  } catch (err) {
    console.error("Error fetching teams:", err);
    return [];
  }
};

// Create a new team
export const createTeam = async (teamData) => {
  try {
    const res = await axios.post(API_URL, teamData);
    return res.data.team || res.data.data;
  } catch (err) {
    console.error("Error creating team:", err);
    throw err;
  }
};

// Add member
export const addTeamMember = async (teamId, userId, role = "Member") => {
  try {
    const res = await axios.post(`${API_URL}/${teamId}/members`, {
      userId,
      role,
    });
    return res.data.member || res.data.data;
  } catch (err) {
    console.error("Error adding member:", err);
    throw err;
  }
};

// Remove member
export const removeTeamMember = async (teamId, userId) => {
  try {
    const res = await axios.delete(`${API_URL}/${teamId}/members/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error removing member:", err);
    throw err;
  }
};

// Assign task
export const assignTask = async (taskData) => {
  try {
    const res = await axios.post(`${API_URL}/${taskData.team_id}/tasks`, taskData);
    return res.data.task || res.data.data;
  } catch (err) {
    console.error("Error assigning task:", err);
    throw err;
  }
};

// Fetch tasks of a team
export const getTasksByTeam = async (teamId) => {
  try {
    const res = await axios.get(`${API_URL}/${teamId}/tasks`);
    return res.data.tasks || res.data.data || [];
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return [];
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users/all`);
    return res.data.users || res.data.data || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};
