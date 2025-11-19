import supabase from "../../config/supabaseClient.js";

// Get all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new announcement
export const addAnnouncement = async (req, res) => {
  try {
    const { title, message, created_by } = req.body;

    const { data, error } = await supabase
      .from("announcements")
      .insert([{ title, message, created_by }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an announcement
export const removeAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
