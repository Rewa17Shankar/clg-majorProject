import express from "express";
import { getAllDesignations, addDesignation } from "../../models/HR/designationModel.js";

const router = express.Router();

// Get all designations
router.get("/", async (req, res) => {
  try {
    const designations = await getAllDesignations();
    res.json(designations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add designation
router.post("/", async (req, res) => {
  try {
    const { designation_name, department_id } = req.body;
    const newDesg = await addDesignation(designation_name, department_id);
    res.json(newDesg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
