import supabase from "../../config/supabaseClient.js";

// ➤ Create Goal
export const createGoal = async (req, res) => {
  try {
    const { user_id, title, description, status, due_date } = req.body;

    const { data, error } = await supabase
      .from("goals")
      .insert([{ user_id, title, description, status, due_date }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get All Goals
export const getGoals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .select("*, users(username)");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get Goals by Employee
export const getGoalsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from("goals")
      .select("*, users(username)")
      .eq("user_id", user_id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Update Goal (status or details)
export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title, description, due_date } = req.body;

    const { data, error } = await supabase
      .from("goals")
      .update({ status, title, description, due_date })
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Delete Goal
export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("goals").delete().eq("id", id);

    if (error) throw error;
    res.json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
