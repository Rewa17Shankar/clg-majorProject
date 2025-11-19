import axios from "axios";

const API_URL = "http://localhost:5000/api/employee/announcements";

export const fetchEmployeeAnnouncements = async () => {
  const token = localStorage.getItem("token");   // ⭐ IMPORTANT

  const { data } = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,          // ⭐ JWT SEND HERE
    },
  });

  return data;
};
