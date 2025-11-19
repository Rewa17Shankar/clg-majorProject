import { supabase } from "../../config/supabaseClient.js";

/**
 * 👉 Fetch tasks assigned to specific employee
 */
export const getEmployeeTasks = async (userId) => {
  const { data, error } = await supabase
    .from("tasks")
    .select(`
      id,
      title,
      description,
      status,
      due_date,
      created_at,
      team_id,
      assigned_to,
      teams ( id, name )
    `)
    .eq("assigned_to", userId)
    .order("due_date", { ascending: true });

  if (error) throw error;

  return data.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    due_date: t.due_date,
    created_at: t.created_at,
    team: t.teams || null,
  }));
};

/**
 * 👉 Update task status
 */
export const updateTaskStatus = async (taskId, status) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
