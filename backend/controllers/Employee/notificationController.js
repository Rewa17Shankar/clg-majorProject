// backend/controllers/Employee/notificationController.js

import supabase from "../../config/supabaseClient.js";

export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
