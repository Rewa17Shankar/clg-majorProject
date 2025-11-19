import axios from "axios";

const API_URL = "http://localhost:5000/api/employee/trainings";

export const fetchEmployeeTrainings = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const getMyTrainings = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const submitFeedback = async (payload) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post("http://localhost:5000/api/employee/trainings/feedback", payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const fetchNotifications = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("http://localhost:5000/api/employee/trainings/notifications", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};
