import axios from "axios";

const API = "http://localhost:5000/api/designations";
// const API = "https://clg-majorprojrct.onrender.com/api/designations";

// export const getDesignations = async () => {
//   const res = await axios.get(API);
//   return res.data;
// };
export const getAllDesignations = async () => {
  try {
    const res = await axios.get(API);
    return res.data; // [{id:1, title:"HR Manager"}, {id:2, title:"Recruiter"}]
  } catch (err) {
    throw err.response?.data || { error: "Something went wrong" };
  }
};
export const addDesignation = async (designation_name, department_id) => {
  const res = await axios.post(API, { designation_name, department_id });
  return res.data;
};
