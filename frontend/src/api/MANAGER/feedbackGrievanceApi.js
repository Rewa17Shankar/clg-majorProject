import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/feedback-grievance";
const BASE_URL = "https://clg-majorprojrct.onrender.com/api/feedback-grievance";

export const getAllGrievances = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const createGrievance = async (payload) => {
  const { data } = await axios.post(BASE_URL, payload);
  return data;
};
