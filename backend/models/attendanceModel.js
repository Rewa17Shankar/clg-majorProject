import supabase from "../config/supabaseClient.js";

export const getAttendance = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*");
  if (error) throw error;
  return data;
};

export const markAttendance = async (payload) => {
  const { data, error } = await supabase
    .from("attendance")
    .insert([payload])
    .select();
  if (error) throw error;
  return data[0];
};
