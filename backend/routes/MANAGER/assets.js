import express from "express";
import supabase from "../../config/supabaseClient.js";

const router = express.Router();

// Get all assets
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("assets")
    .select("id, name, assigned_to, assigned_date, return_date, status, users(username)")
    .order("assigned_date", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Add new asset
router.post("/", async (req, res) => {
  const { name, assigned_to, assigned_date, return_date } = req.body;

  const { data, error } = await supabase
    .from("assets")
    .insert([{ name, assigned_to, assigned_date, return_date }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// Update asset (Return asset)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, return_date } = req.body;

  const { data, error } = await supabase
    .from("assets")
    .update({ status, return_date })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("assets").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Asset deleted successfully" });
});

export default router;
