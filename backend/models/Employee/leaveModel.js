import { supabase } from '../../config/supabaseClient.js';

export const getLeaveRequests = async (userId) => {
  const { data, error } = await supabase
    .from('leave_requests')
    .select('*, leave_types(*)')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data;
};

export const getLeaveTypes = async () => {
  const { data, error } = await supabase.from('leave_types').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const createLeaveRequest = async (userId, leaveTypeId, startDate, endDate) => {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert([{
      user_id: userId,
      leave_type_id: leaveTypeId,
      start_date: startDate,
      end_date: endDate,
      status: 'Pending',
      applied_at: new Date(),
    }])
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

