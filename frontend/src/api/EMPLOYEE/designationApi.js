import axios from "axios";

const API_URL = "http://localhost:5000/api/employee/designation";

export const fetchMyDesignation = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
