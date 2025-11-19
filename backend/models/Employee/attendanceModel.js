import { supabase } from '../../config/supabaseClient.js';

export const getAttendanceRecords = async (userId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
