import axios from "axios";

// const API_URL = "http://localhost:5000/api/skills";
const API_URL = "https://clg-majorprojrct.onrender.com/api/skills";

export const fetchSkills = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const fetchUsers = async () => {
  const { data } = await axios.get(`${API_URL}/users`);
  return data;
};

export const createSkill = async (skill) => {
  const { data } = await axios.post(API_URL, skill);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
