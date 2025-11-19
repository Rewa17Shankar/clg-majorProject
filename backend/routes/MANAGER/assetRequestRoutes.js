import express from "express";
import supabase from "../../config/supabaseClient.js";

const router = express.Router();

// Get all employee asset requests
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("asset_requests")
        .select("*, users(username)")
        .order("created_at", { ascending: false });

    res.json(data);
});


// Approve / Reject request
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, due_date } = req.body;

  const { data, error } = await supabase
    .from("asset_requests")
    .update({ status, due_date })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
});

export default router;
