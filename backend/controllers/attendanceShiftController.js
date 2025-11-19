// /backend/controllers/attendanceShiftController.js
import { AttendanceShiftModel } from "../../models/attendanceShiftModel.js";

export const getAttendanceShift = async (req, res) => {
  try {
    const managerId = req.user?.id; // comes from auth middleware
    if (!managerId) return res.status(401).json({ error: "Unauthorized" });

    const records = await AttendanceShiftModel.getAttendanceByManager(managerId);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
