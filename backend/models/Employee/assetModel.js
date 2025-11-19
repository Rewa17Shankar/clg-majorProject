import { supabase } from '../../config/supabaseClient.js';

export const getAssets = async (userId) => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('assigned_to', userId);
  if (error) throw new Error(error.message);
  return data;
};
