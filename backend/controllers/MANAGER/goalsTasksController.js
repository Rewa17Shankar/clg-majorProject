import supabase from "../../config/supabaseClient.js";

export const getGoalsTasks = async (req, res) => {
  try {
    const managerId = req.user?.id;
    if (!managerId) return res.status(401).json({ error: "Unauthorized" });

    console.log("📌 Fetching manager goals...");

    const { data, error } = await supabase
      .from("goals")        // ✔ correct table name
      .select(`
        *,
        users:user_id (
          id,
          username
        )
      `)
      .eq("manager_id", managerId)
      .order("due_date", { ascending: true });

    if (error) throw error;

    res.json(data);

  } catch (err) {
    console.error("❌ Goals Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addGoal = async (req, res) => {
  try {
    const managerId = req.user?.id;
    if (!managerId) return res.status(401).json({ error: "Unauthorized" });

    const { user_id, title, description, due_date } = req.body;

    if (!user_id || !title) {
      return res.status(400).json({ error: "Employee ID & Title required" });
    }

    const { data, error } = await supabase
      .from("goals")     // ✔ correct table name
      .insert([
        {
          user_id,
          manager_id: managerId,
          title,
          description,
          due_date,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);

  } catch (err) {
    console.error("❌ Add Goal Error:", err);
    res.status(500).json({ error: err.message });
  }
};
