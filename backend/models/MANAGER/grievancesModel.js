import supabase from "../../config/supabaseClient.js";

export const getAllGrievances = async () => {
  const { data, error } = await supabase.from("grievances").select("*");
  if (error) throw error;
  return data;
};

export const createGrievance = async ({ user_id, title, description, manager_id }) => {
  const { data, error } = await supabase
    .from("grievances")
    .insert([{ user_id, title, description, manager_id }])
    .select();
  if (error) throw error;
  return data;
};