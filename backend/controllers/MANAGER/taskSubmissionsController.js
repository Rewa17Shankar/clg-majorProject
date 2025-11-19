import supabase from "../../config/supabaseClient.js";

// =============================================
// GET ALL SUBMITTED TASKS (For Manager)
// =============================================
export const getSubmittedTasks = async (req, res) => {
  try {
    console.log("📌 Fetching submitted tasks...");

    const managerId = req.user?.id;
    if (!managerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 1️⃣ Get teams manager handles
    const { data: teams, error: teamErr } = await supabase
      .from("teams")
      .select("id")
      .eq("manager_id", managerId);

    if (teamErr) throw teamErr;

    const teamIds = teams?.map(t => t.id);
    if (!teamIds || teamIds.length === 0) {
      return res.json([]);
    }

    // 2️⃣ Find tasks inside these teams
    const { data: tasks, error: taskErr } = await supabase
      .from("tasks")
      .select("id")
      .in("team_id", teamIds);

    if (taskErr) throw taskErr;

    const taskIds = tasks.map(t => t.id);

    // 3️⃣ Fetch submissions for those tasks
    const { data: submissions, error: subErr } = await supabase
      .from("task_submissions")
      .select(`
        id,
        task_id,
        employee_id,
        completion_note,
        attached_url,
        submitted_at,
        manager_seen,
        tasks:task_id (title, description),
        users:employee_id (username)
      `)
      .in("task_id", taskIds);

    if (subErr) throw subErr;

    res.json(submissions);

  } catch (err) {
    console.error("❌ Submission Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// =============================================
// UPDATE SUBMISSION STATUS (Approve / Reject)
// =============================================
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const { data, error } = await supabase
      .from("task_submissions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: "Status Updated Successfully",
      submission: data,
    });

  } catch (err) {
    console.error("❌ Status Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};
