import axios from "axios";

// const API_URL = "http://localhost:5000/api/trainings";
const API_URL = "https://clg-majorproject-oab0.onrender.com/api/trainings";

// Get all trainings
export const getAllTrainings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Create new training
export const createTraining = async (trainingData) => {
  const res = await axios.post(API_URL, trainingData);
  return res.data;
};

//update
export const updateTrainingProgressApi = async (id, payload) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.patch(`http://localhost:5000/api/trainings/${id}/progress`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};
