
import axios from "axios";

// const API_URL = "http://localhost:5000/api/assets"; 
const API_URL = "https://clg-majorprojrct.onrender.com/api/assets"; 

export const getAssets = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const assignAsset = async (asset) => {
  const res = await axios.post(API_URL, asset);
  return res.data;
};

export const returnAsset = async (id) => {
  const res = await axios.put(`${API_URL}/${id}/return`);
  return res.data;
};
