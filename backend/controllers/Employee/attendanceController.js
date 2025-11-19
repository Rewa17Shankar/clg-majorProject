import * as AttendanceModel from '../../models/Employee/attendanceModel.js';

export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user?.id;
    const attendance = await AttendanceModel.getAttendanceRecords(userId);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
