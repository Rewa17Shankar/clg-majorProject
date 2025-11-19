import supabase from "../../config/supabaseClient.js";

export const getEmployees = async () => {
  const { data, error } = await supabase.from("employees").select("*");
  if (error) throw error;
  return data;
};

export const createEmployee = async (payload) => {
  const { data, error } = await supabase
    .from("employees")
    .insert([payload])
    .select();
  if (error) throw error;
  return data[0];
};

// Get all employees with relations
export async function getAllEmployees() {
  return await supabase
    .from("users")
    .select(
      `
      id,
      username,
      email,
      date_of_joining,
      departments:department_id(name),
      designations:designation_id(title),
      roles:role_id(role_name)
    `
    )
    .order("id", { ascending: true });
}

// Get single employee
export async function getEmployeeById(id) {
  return await supabase
    .from("users")
    .select(
      `
      id,
      username,
      email,
      date_of_joining,
      departments:department_id(name),
      designations:designation_id(title),
      roles:role_id(role_name)
    `
    )
    .eq("id", id)
    .single();
}
