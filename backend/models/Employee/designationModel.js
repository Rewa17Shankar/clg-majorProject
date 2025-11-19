import supabase from "../../config/supabaseClient.js";

export const getMyDesignation = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(`
      id,
      username,
      email,
      department_id,
      designation_id,
      designations(title),
      departments(name)
    `)
    .eq("id", userId)
    .single();

  if (error) throw error;

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    department: data.departments?.name || "Not Assigned",
    designation: data.designations?.title || "Not Assigned",
  };
};
