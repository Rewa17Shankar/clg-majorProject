import axios from "axios";

// const API_URL = "http://localhost:5000/api/performance";
const API_URL = "https://clg-majorprojrct.onrender.com/api/performance";

export const addReview = async (reviewData) => {
  const res = await axios.post(API_URL, reviewData);
  return res.data;
};

export const getAllReviews = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getReviewsByUser = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};
