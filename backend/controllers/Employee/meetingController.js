import { getMeetingsForEmployee } from "../../models/Employee/meetingModel.js";

export const getEmployeeMeetings = async (req, res) => {
  try {
    const meetings = await getMeetingsForEmployee();
    res.json(meetings);
  } catch (err) {
    console.error("❌ EMPLOYEE MEETINGS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
