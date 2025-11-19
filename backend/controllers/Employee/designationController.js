import { getMyDesignation } from "../../models/Employee/designationModel.js";

export const getMyDesignationController = async (req, res) => {
  try {
    const userId = req.user.id;  // from authMiddleware
    const result = await getMyDesignation(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
