import supabase from "../../config/supabaseClient.js";

// Fetch all meetings
export const getAllMeetings = async () => {
  const { data, error } = await supabase.from("meetings").select("*");
  if (error) throw error;
  return data;
};

// Create new meeting
export const createMeeting = async ({ title, description, meeting_date, start_time, end_time, manager_id }) => {
  const { data, error } = await supabase
    .from("meetings")
    .insert([{ title, description, meeting_date, start_time, end_time, manager_id }])
    .select();
  if (error) throw error;
  return data;
};

// Delete meeting by id
export const deleteMeeting = async (id) => {
  const { data, error } = await supabase.from("meetings").delete().eq("id", id);
  if (error) throw error;
  return data;
};
