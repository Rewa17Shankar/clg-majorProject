import * as LeaveModel from '../../models/Employee/leaveModel.js';

export const getMyLeaves = async (req, res) => {
  try {
    const userId = req.user?.id;
    const leaves = await LeaveModel.getLeaveRequests(userId);
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const applyLeave = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { leave_type_id, start_date, end_date } = req.body;
    const leave = await LeaveModel.createLeaveRequest(userId, leave_type_id, start_date, end_date);
    res.json({ message: 'Leave applied', data: leave });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLeaveTypes = async (req, res) => {
  try {
    const types = await LeaveModel.getLeaveTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
