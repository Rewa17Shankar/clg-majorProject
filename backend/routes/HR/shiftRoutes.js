import express from "express";
import supabase from "../../config/supabaseClient.js";

const router = express.Router();

// Create new shift
router.post("/", async (req, res) => {
  try {
    const { shift_name, start_time, end_time } = req.body;

    const { data, error } = await supabase
      .from("shifts")
      .insert([{ shift_name, start_time, end_time }]);

    if (error) throw error;
    res.status(201).json({ message: "Shift created successfully", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all shifts
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("shifts").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
