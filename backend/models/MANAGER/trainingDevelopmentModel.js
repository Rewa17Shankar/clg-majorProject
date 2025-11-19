// /backend/models/trainingDevelopmentModel.js
import supabase from "../../config/supabaseClient.js";

export const TrainingDevelopmentModel = {
  async getProgramsByManager(managerId) {
    // Step 1: Get manager’s department
    const { data: manager, error: managerError } = await supabase
      .from("users")
      .select("department_id")
      .eq("id", managerId)
      .single();

    if (managerError) throw managerError;

    // Step 2: Get employees of that department
    const { data: employees, error: empError } = await supabase
      .from("users")
      .select("id, username")
      .eq("department_id", manager.department_id);

    if (empError) throw empError;

    const employeeIds = employees.map((e) => e.id);

    // Step 3: Get training programs assigned to those employees
    const { data, error } = await supabase
      .from("training_programs")
      .select("id, user_id, title, description, start_date, end_date, status, users(username)")
      .in("user_id", employeeIds);

    if (error) throw error;
    return data;
  },

  async createProgram(program) {
    const { data, error } = await supabase
      .from("training_programs")
      .insert(program)
      .select();

    if (error) throw error;
    return data[0];
  },
};
