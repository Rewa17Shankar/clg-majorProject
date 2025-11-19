import pool from "../../config/supabaseClient.js";

// Get all announcements
export const getAllAnnouncements = async () => {
  const result = await pool.query("SELECT * FROM announcements ORDER BY created_at DESC");
  return result.rows;
};

// Create new announcement
export const addAnnouncement = async ({ title, message, created_by }) => {
  const result = await pool.query(
    `INSERT INTO announcements (title, message, created_by)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, message, created_by]
  );
  return result.rows[0];
};

// Delete announcement
export const removeAnnouncement = async (id) => {
  await pool.query("DELETE FROM announcements WHERE id = $1", [id]);
  return { message: "Announcement deleted" };
};
