import request from "./Api"; 

// Get token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token; // make sure token is stored after login
};

export const clockIn = async () =>
  request("/attendance/clock-in", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const clockOut = async () =>
  request("/attendance/clock-out", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getEmployeeAttendance = (employeeId) =>
  request(`/attendance/employee/${employeeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAllAttendance = () =>
  request("/attendance", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
