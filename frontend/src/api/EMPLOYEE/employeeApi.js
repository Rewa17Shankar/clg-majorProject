import request from "../Api.js";

// ========== DASHBOARD ==========
export const getDashboardStats = () => request("/employee/stats");

// ========== PROFILE ==========
export const getEmployeeProfile = () => request("/employee/profile");

// ========== ATTENDANCE ==========
export const getMyAttendance = () => request("/employee/attendance");
export const clockIn = () => request("/employee/clock-in", { method: "POST", body: JSON.stringify({}) });
export const clockOut = () => request("/employee/clock-out", { method: "POST", body: JSON.stringify({}) });

// ========== LEAVES ==========
export const getMyLeaves = () => request("/employee/leaves");
export const getLeaveTypes = () => request("/employee/leave-types");
export const applyLeave = (data) => 
  request("/employee/apply-leave", {
    method: "POST",
    body: JSON.stringify(data)
  });

// ========== PAYROLL ==========
export const getMyPayroll = () => request("/employee/payroll");

// ========== PERFORMANCE ==========
export const getMyPerformance = () => request("/employee/performance");

// ========== ANNOUNCEMENTS ==========
export const getAnnouncements = () => request("/employee/announcements");

// ========== MEETINGS ==========
export const getMyMeetings = () => request("/employee/meetings");

// ========== TRAININGS ==========
export const getMyTrainings = () => request("/employee/trainings");

// ========== ASSETS ==========
export const getMyAssets = () => request("/employee/assets");

// ========== GOALS ==========
export const getMyGoals = () => request("/employee/goals");

// ========== TEAM ==========
export const getMyTeam = () => request("/employee/team");

// ========== SKILLS ==========
export const getMySkills = () => request("/employee/skills");

// ========== RESIGNATION ==========
export const submitResignation = (data) =>
  request("/employee/resign", {
    method: "POST",
    body: JSON.stringify(data)
  });
export const getMyResignation = () => request("/employee/resignation");

// ========== TASKS ==========
export const getMyTasks = () => request("/employee/tasks");
export const getTasksByUserId = (userId) => 
  request(`/employee/tasks?user_id=${userId}`);
