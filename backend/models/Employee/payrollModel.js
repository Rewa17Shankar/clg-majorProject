import { supabase } from '../../config/supabaseClient.js';

export const getPayrollRecords = async (userId) => {
  try {
    console.log('Fetching payroll for user:', userId);
    
    const { data, error } = await supabase
      .from('payroll')
      .select('*')
      .eq('user_id', userId)
      .order('year', { ascending: false })
      .order('month', { ascending: false });
    
    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message);
    }

    console.log(' Payroll data:', data);
    
    return data || [];
  } catch (error) {
    console.error('❌ Model error:', error);
    throw error;
  }
};
