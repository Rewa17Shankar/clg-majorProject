import supabase from "../config/supabaseClient.js";

// ✅ Clock In
export const clockIn = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const today = new Date().toISOString().split("T")[0];

    // check if already clocked in
    const { data: existing } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (existing && existing.start_at) {
      return res.status(400).json({ error: "Already clocked in today" });
    }

    const { data, error } = await supabase.from("attendance").insert([
      {
        user_id: userId,
        date: today,
        status: "Present",
        start_at: new Date().toISOString()
      }
    ]).select();

    if (error) throw error;
    res.json({ message: "Clock in successful", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Clock Out
export const clockOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const { data: record, error: fetchErr } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (fetchErr || !record) return res.status(400).json({ error: "No clock-in found" });
    if (record.end_at) return res.status(400).json({ error: "Already clocked out" });

    const endTime = new Date();
    const startTime = new Date(record.start_at);
    const diffHours = (endTime - startTime) / (1000 * 60 * 60);

    const workedHours = parseFloat(diffHours.toFixed(2));
    const overtime = workedHours > 8 ? workedHours - 8 : 0;

    const { data, error } = await supabase
      .from("attendance")
      .update({
        end_at: endTime.toISOString(),
        hours_worked: workedHours,
        overtime_hours: overtime
      })
      .eq("id", record.id)
      .select();

    if (error) throw error;
    res.json({ message: "Clock out successful", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
