import pool from "../../config/supabaseClient.js";

// Get all assets
export const getAllAssets = async () => {
  const result = await pool.query("SELECT * FROM assets ORDER BY assigned_date DESC");
  return result.rows;
};

// Assign new asset
export const createAsset = async ({ name, assigned_to, assigned_date, return_date }) => {
  const result = await pool.query(
    `INSERT INTO assets (name, assigned_to, assigned_date, return_date, status)
     VALUES ($1, $2, $3, $4, 'Assigned') RETURNING *`,
    [name, assigned_to, assigned_date, return_date]
  );
  return result.rows[0];
};

// Return asset
export const markAssetReturned = async (id) => {
  const result = await pool.query(
    `UPDATE assets SET status = 'Returned', return_date = NOW() WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};
