// /backend/models/goalsTasksModel.js
import supabase from "../../config/supabaseClient.js";

export const GoalsTasksModel = {
  async getGoalsByManager(managerId) {
    // Step 1: Get manager's department
    const { data: manager, error: managerError } = await supabase
      .from("users")
      .select("department_id")
      .eq("id", managerId)
      .single();

    if (managerError) throw managerError;

    // Step 2: Get all employees in that department
    const { data: employees, error: employeesError } = await supabase
      .from("users")
      .select("id, username")
      .eq("department_id", manager.department_id);

    if (employeesError) throw employeesError;

    const employeeIds = employees.map((e) => e.id);

    // Step 3: Get goals for those employees
    const { data, error } = await supabase
      .from("goals")
      .select("id, user_id, title, description, status, due_date, users(username)")
      .in("user_id", employeeIds);

    if (error) throw error;
    return data;
  },

  async createGoal(goal) {
    const { data, error } = await supabase.from("goals").insert(goal).select();
    if (error) throw error;
    return data[0];
  },
};
