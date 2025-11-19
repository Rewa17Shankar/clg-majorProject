import { supabase } from '../../config/supabaseClient.js';

export const getEmployeeProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      departments(id, name),
      designations(id, title)
    `)
    .eq('id', userId)
    .single();
  
  if (error) throw new Error(error.message);
  return data;
};

export const getAttendanceRecords = async (userId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(30);
  
  if (error) throw new Error(error.message);
  return data;
};

export const createAttendance = async (userId, type = 'clock_in') => {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: existing } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  if (existing && type === 'clock_in') {
    if (existing.start_at) throw new Error('Already clocked in');
  }

  if (type === 'clock_in') {
    const { data, error } = await supabase
      .from('attendance')
      .insert([{
        user_id: userId,
        date: today,
        start_at: new Date(),
        status: 'Present'
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } else if (type === 'clock_out') {
    if (!existing) throw new Error('No clock in record found');
    if (existing.end_at) throw new Error('Already clocked out');

    const startTime = new Date(existing.start_at);
    const endTime = new Date();
    const hoursWorked = (endTime - startTime) / (1000 * 60 * 60);

    const { data, error } = await supabase
      .from('attendance')
      .update({
        end_at: new Date(),
        hours_worked: parseFloat(hoursWorked.toFixed(2))
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};

export const getLeaveRequests = async (userId) => {
  const { data, error } = await supabase
    .from('leave_requests')
    .select(`
      *,
      leave_types(id, type)
    `)
    .eq('user_id', userId)
    .order('applied_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getLeaveTypes = async () => {
  const { data, error } = await supabase
    .from('leave_types')
    .select('*');

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
      applied_at: new Date()
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getPayrollRecords = async (userId) => {
  const { data, error } = await supabase
    .from('payroll')
    .select('*')
    .eq('user_id', userId)
    .order('year', { ascending: false })
    .order('month', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getPerformanceReviews = async (userId) => {
  const { data, error } = await supabase
    .from('performance_reviews')
    .select(`
      *,
      users:reviewer_id(id, username, email)
    `)
    .eq('user_id', userId)
    .order('review_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getAnnouncements = async (limit = 10) => {
  const { data, error } = await supabase
    .from('announcements')
    .select(`
      *,
      users:created_by(id, username)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
};

export const getMeetings = async (userId) => {
  const { data, error } = await supabase
    .from('meetings')
    .select(`
      *,
      users:manager_id(id, username, email)
    `)
    .order('meeting_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getTrainings = async (userId) => {
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getAssets = async (userId) => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('assigned_to', userId);

  if (error) throw new Error(error.message);
  return data;
};

export const getGoals = async (userId) => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const getTeamMembers = async (userId) => {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      *,
      teams(*)
    `)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
};

export const getSkills = async (userId) => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
};

export const getDashboardStats = async (userId) => {
  // Attendance count
  const { data: attendanceData } = await supabase
    .from('attendance')
    .select('id')
    .eq('user_id', userId);
  
  const attendanceCount = attendanceData?.length || 0;

  // Leave balance
  const { data: leaveData } = await supabase
    .from('leave_requests')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'Pending');
  
  const leaveBalance = leaveData?.length || 0;

  // Performance rating
  const { data: performanceData } = await supabase
    .from('performance_reviews')
    .select('rating')
    .eq('user_id', userId)
    .order('review_date', { ascending: false })
    .limit(1);

  const performanceRating = performanceData?.length > 0 ? performanceData[0].rating : 'N/A';

  return {
    attendanceCount,
    leaveBalance,
    performanceRating
  };
};

export const createResignation = async (userId, noticeDate, lastWorkingDate, reason) => {
  const { data, error } = await supabase
    .from('resignations')
    .insert([{
      user_id: userId,
      notice_date: noticeDate,
      last_working_date: lastWorkingDate,
      reason,
      status: 'Pending',
      created_at: new Date()
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getResignation = async (userId) => {
  const { data, error } = await supabase
    .from('resignations')
    .select('*')
    .eq('user_id', userId)
    .neq('status', 'Cancelled')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) throw new Error(error.message);
  return data?.length > 0 ? data[0] : null;
};
