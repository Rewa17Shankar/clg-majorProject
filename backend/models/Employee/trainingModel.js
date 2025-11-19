import { supabase } from '../../config/supabaseClient.js';

export const getTrainings = async (userId) => {
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data;
};
