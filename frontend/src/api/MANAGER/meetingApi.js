
import axios from "axios";

// const API_URL = "http://localhost:5000/api/meetings";
const API_URL = "https://clg-majorproject-oab0.onrender.com/api/meetings";

export const getMeetings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMeeting = async (meeting) => {
  const res = await axios.post(API_URL, meeting);
  return res.data;
};

export const deleteMeeting = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
