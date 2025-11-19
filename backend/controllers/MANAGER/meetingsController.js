import * as Meeting from "../../models/MANAGER/meetingsModel.js";

// Get all meetings
export const getMeetings = async (req, res) => {
  try {
    const data = await Meeting.getAllMeetings();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new meeting
export const addMeeting = async (req, res) => {
  try {
    const { title, description, meeting_date, start_time, end_time, manager_id } = req.body;
    const data = await Meeting.createMeeting({ title, description, meeting_date, start_time, end_time, manager_id });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete meeting
export const removeMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Meeting.deleteMeeting(id);
    res.status(200).json({ message: "Meeting deleted", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
