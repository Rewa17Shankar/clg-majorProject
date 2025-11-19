import supabase from "../../config/supabaseClient.js";

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select(`*, user_id(username)`) // Fetch username along with user_id
      .order("id", { ascending: true });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add skill
export const addSkill = async (req, res) => {
  try {
    const { user_id, skill_name, proficiency } = req.body;

    const { data, error } = await supabase
      .from("skills")
      .insert([{ user_id, skill_name, proficiency }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete skill
export const removeSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users for dropdown
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .order("username", { ascending: true });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
