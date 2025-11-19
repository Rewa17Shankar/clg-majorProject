import API from "../Api";

export const getEmployeeTasks = async () => {
  const res = await API.get("/employee/tasks");
  return res.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const res = await API.patch(`/employee/tasks/${taskId}/status`, { status });
  return res.data;
};

export const submitTask = async (taskId, payload) => {
  const res = await API.post(`/employee/tasks/${taskId}/submit`, payload);
  return res.data;
};
