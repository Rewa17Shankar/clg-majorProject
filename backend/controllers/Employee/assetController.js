import supabase from "../../config/supabaseClient.js";

// Get assigned + history
export const getEmployeeAssets = async (req, res) => {
  const { user_id } = req.params;

  const { data: assigned, error: aErr } = await supabase
    .from("assets")
    .select("*")
    .eq("assigned_to", user_id);

  const { data: requests, error: rErr } = await supabase
    .from("asset_requests")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (aErr || rErr)
    return res.status(400).json({ error: aErr?.message || rErr?.message });

  res.json({ assigned, requests });
};

// Request NEW Asset
export const requestAsset = async (req, res) => {
  const { user_id, asset_name, reason } = req.body;

  const { data, error } = await supabase
    .from("asset_requests")
    .insert([{ user_id, asset_name, reason, status: "Pending" }])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
};

//Get manager


export const getManagersList = async (req, res) => {
  // Manager role_id = 2  (change if different)
  const MANAGER_ROLE = 2;

  const { data, error } = await supabase
    .from("users")
    .select("id, username, role_id")
    .eq("role_id", MANAGER_ROLE);

  if (error) {
    console.log("Supabase Error:", error);
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};



// Get ALL Requests By User
export const getEmployeeRequests = async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from("asset_requests")
    .select("*")
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};
