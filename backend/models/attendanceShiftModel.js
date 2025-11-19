// /backend/models/attendanceShiftModel.js
import supabase from "../config/supabaseClient.js";

export const AttendanceShiftModel = {
  async getAttendanceByManager(managerId) {
    // Find manager's department
    const { data: manager, error: managerError } = await supabase
      .from("users")
      .select("department_id")
      .eq("id", managerId)
      .single();

    if (managerError) throw managerError;

    // Get users in department
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, username, email, department_id")
      .eq("department_id", manager.department_id);

    if (usersError) throw usersError;

    const userIds = users.map((u) => u.id);

    // Get attendance records with shifts
    const { data, error } = await supabase
      .from("attendance")
      .select("id, user_id, date, status, shift_id, shifts(name, start_time, end_time)")
      .in("user_id", userIds);

    if (error) throw error;
    return data;
  },
};
