import supabase from "../../config/supabaseClient.js";

export const getMeetingsForEmployee = async () => {
  const { data, error } = await supabase
    .from("meetings")
    .select("id, title, description, meeting_date, start_time, end_time, manager_id")
    .order("meeting_date", { ascending: true });

  if (error) throw error;
  return data;
};
