// controllers/resignationController.js
import Resignation from "../../models/HR/resignationModel.js";

export const getResignations = async (req, res) => {
  try {
    const data = await Resignation.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createResignation = async (req, res) => {
  try {
    const { user_id, notice_date, last_working_date, reason } = req.body;
    const resignation = await Resignation.create({ user_id, notice_date, last_working_date, reason });
    res.status(201).json(resignation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const resignation = await Resignation.updateStatus(id, status);
    res.json(resignation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResignationsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await Resignation.getByUser(user_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

