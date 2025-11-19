import axios from "axios";

const API_URL = "http://localhost:5000/api/manager/submissions";

// ============================
// GET SUBMITTED TASKS
// ============================
export const getSubmittedTasks = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ============================
// UPDATE SUBMISSION STATUS (Approve/Reject)
// ============================
export const updateSubmission = async (id, status) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const res = await axios.patch(
    `${API_URL}/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ============================
// MARK AS SEEN (optional)
// ============================
export const markAsSeen = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const res = await axios.patch(
    `${API_URL}/${id}/seen`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
