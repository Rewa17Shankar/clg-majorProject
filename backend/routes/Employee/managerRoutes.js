import express from "express";
import supabase from "../../config/supabaseClient.js";

const router = express.Router();

// ---- PUBLIC ROUTE ----
router.get("/list", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, roleId")
    .eq("roleId", 2);  // 2 = manager

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

export default router;