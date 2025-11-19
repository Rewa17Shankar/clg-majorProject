// /backend/models/skillsModel.js
import supabase from "../../config/supabaseClient.js";

export const SkillsModel = {
  async getSkillsByManager(managerId) {
    // Step 1: Get manager’s department
    const { data: manager, error: managerError } = await supabase
      .from("users")
      .select("department_id")
      .eq("id", managerId)
      .single();

    if (managerError) throw managerError;

    // Step 2: Get employees in that department
    const { data: employees, error: empError } = await supabase
      .from("users")
      .select("id, username")
      .eq("department_id", manager.department_id);

    if (empError) throw empError;

    const employeeIds = employees.map((e) => e.id);

    // Step 3: Fetch skills of those employees
    const { data, error } = await supabase
      .from("skills")
      .select("id, user_id, skill_name, proficiency, users(username)")
      .in("user_id", employeeIds);

    if (error) throw error;
    return data;
  },

  async addSkill(skill) {
    const { data, error } = await supabase
      .from("skills")
      .insert(skill)
      .select();

    if (error) throw error;
    return data[0];
  },
};
