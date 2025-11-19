import axios from "axios";

const BASE_URL = "http://localhost:5000/api/meetings"; 
// const BASE_URL = "https://clg-majorprojrct.onrender.com/api/meetings"; 

// Get all meetings
export const fetchMeetings = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Create new meeting
export const createMeeting = async (meeting) => {
  try {
    const response = await axios.post(BASE_URL, meeting);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Delete meeting
export const deleteMeeting = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
