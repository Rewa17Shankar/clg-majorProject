import { supabase } from '../../config/supabaseClient.js';

export const getAnnouncements = async () => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
