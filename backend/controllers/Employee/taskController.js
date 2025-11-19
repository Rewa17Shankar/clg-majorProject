import supabase from "../../config/supabaseClient.js";

// =============================================
// GET EMPLOYEE TASKS
// =============================================
export const getEmployeeTasks = async (req, res) => {
  try {
     console.log("🔥 Decoded User:", req.user)
    const employeeId = req.user.id || req.user.userId;
    console.log("🔥 Employee ID Used:", employeeId);

    const { data, error } = await supabase
      .from("tasks")
      .select("*, task_submissions(*)")
      .eq("assigned_to", employeeId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ tasks: data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =============================================
// UPDATE TASK STATUS
// =============================================
export const updateTaskStatus = async (req, res) => {
  try {
    const employeeId = String(req.user.id || req.user.userId);
    const taskId = String(req.params.id);
    const { status } = req.body;

    console.log("Employee:", employeeId);
    console.log("Task ID:", taskId);

    const { data: task, error: fetchErr } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();

    if (fetchErr || !task)
      return res.status(404).json({ message: "Task not found" });

    if (!task.assigned_to) {
      return res.status(400).json({
        message: "Task has no assigned employee",
      });
    }

    if (String(task.assigned_to) !== String(employeeId))
      return res.status(403).json({ message: "Not allowed" });

    const { data, error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", taskId)
      .select();

    if (error) throw error;

    res.status(200).json({ message: "Status updated", task: data[0] });

  } catch (err) {
    console.log("🔥 ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};




// =============================================
// SUBMIT TASK FOR REVIEW
// =============================================
export const submitTaskForReview = async (req, res) => {
  try {
    const employeeId = req.user.id || req.user.userId;  // ✅ FIXED
    const taskId = req.params.id;
    const { completionNote, attachedUrl } = req.body;

    const { data: task } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assigned_to !== employeeId)
      return res.status(403).json({ message: "Not allowed" });

    const { data: submission, error: subErr } = await supabase
      .from("task_submissions")
      .insert([{
        task_id: taskId,
        employee_id: employeeId,
        completion_note: completionNote,
        attached_url: attachedUrl,
      }])
      .select()
      .single();

    if (subErr) throw subErr;

    const { data: updatedTask, error: updErr } = await supabase
      .from("tasks")
      .update({ status: "Completed" })
      .eq("id", taskId)
      .select()
      .single();

    if (updErr) throw updErr;

    res.status(200).json({
      message: "Task submitted",
      submission,
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
