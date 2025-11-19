import supabase from "../../config/supabaseClient.js";

/** ---------- LEAVE TYPES ---------- **/

export async function listLeaveTypes(req, res) {
  try {
    const { data, error } = await supabase
      .from("leave_types")
      .select("*");
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addLeaveType(req, res) {
  try {
    const { type } = req.body;
    if (!type) return res.status(400).json({ error: "type is required" });

    const { data, error } = await supabase
      .from("leave_types")
      .insert([{ type }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function editLeaveType(req, res) {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const { data, error } = await supabase
      .from("leave_types")
      .update({ type })
      .eq("id", id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeLeaveType(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("leave_types")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** ---------- LEAVE REQUESTS ---------- **/

export async function createRequest(req, res) {
  try {
    const { user_id, leave_type_id, start_date, end_date } = req.body;

    if (!user_id || !leave_type_id || !start_date || !end_date) {
      return res.status(400).json({
        error: "All fields required: user_id, leave_type_id, start_date, end_date",
      });
    }

    const payload = {
      user_id: parseInt(user_id),           // ✅ int
      leave_type_id: leave_type_id,         // ✅ uuid string
      start_date: start_date.toString(),
      end_date: end_date.toString(),
      status: "Pending",
      applied_at: new Date().toISOString(),
    };

    console.log("📥 Creating leave request:", payload);

    const { data, error } = await supabase
      .from("leave_requests")
      .insert([payload])
      .select();

    if (error) throw error;

    res.status(201).json({ data });
  } catch (error) {
    console.error("❌ Create request error:", error);
    res.status(400).json({ error: error.message || "Failed to create leave request" });
  }
}

export async function listRequests(req, res) {
  try {
    const { status, user_id } = req.query;

    let query = supabase
      .from("leave_requests")
      .select("*, leave_types(id, type)");

    if (status) query = query.eq("status", status);
    if (user_id) query = query.eq("user_id", user_id);

    const { data, error } = await query;

    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getRequest(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("leave_requests")
      .select("*, leave_types(id, type)")
      .eq("id", id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function setRequestStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ALLOWED = ["Pending", "Approved", "Rejected"];
    if (!ALLOWED.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const { data, error } = await supabase
      .from("leave_requests")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeRequest(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("leave_requests")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
