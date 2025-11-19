import { getAllGrievances, createGrievance } from "../../models/MANAGER/grievancesModel.js";

// Fetch all grievances
export const fetchGrievances = async (req, res) => {
  try {
    const grievances = await getAllGrievances();
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new grievance
export const addGrievance = async (req, res) => {
  const { user_id, title, description, manager_id } = req.body;
  try {
    const grievance = await createGrievance({ user_id, title, description, manager_id });
    res.status(201).json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
