import axios from "axios";

const API = "http://localhost:5000/api";

export const getEmployeeAssets = async (id) => {
  const res = await axios.get(`${API}/employee-assets/${id}`);
  return res.data;
};

export const requestAsset = async (data) => {
  const res = await axios.post(`${API}/employee-assets/request`, data);
  return res.data;
};

export const getManagers = async () => {
  const res = await axios.get(`${API}/employee/managers/list`);
  return res.data;
};
