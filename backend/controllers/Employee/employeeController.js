// import { supabase } from '../../config/supabaseClient.js';

// // Get Employee Profile
// export const getEmployeeProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // From auth middleware

//     const { data, error } = await supabase
//       .from('users')
//       .select(`
//         *,
//         departments(name),
//         designations(title),
//         roles(role_name)
//       `)
//       .eq('id', userId)
//       .single();

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Employee Profile (limited fields)
// export const updateEmployeeProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { email } = req.body; // Only allow email update

//     const { data, error } = await supabase
//       .from('users')
//       .update({ email })
//       .eq('id', userId)
//       .select()
//       .single();

//     if (error) throw error;
//     res.json({ message: 'Profile updated successfully', data });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Employee Attendance History
// export const getMyAttendance = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { startDate, endDate } = req.query;

//     let query = supabase
//       .from('attendance')
//       .select(`
//         *,
//         shifts(name, start_time, end_time)
//       `)
//       .eq('user_id', userId)
//       .order('date', { ascending: false });

//     if (startDate && endDate) {
//       query = query.gte('date', startDate).lte('date', endDate);
//     }

//     const { data, error } = await query;

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Clock In
// export const clockIn = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const today = new Date().toISOString().split('T')[0];

//     // Check if already clocked in today
//     const { data: existing } = await supabase
//       .from('attendance')
//       .select('*')
//       .eq('user_id', userId)
//       .eq('date', today)
//       .single();

//     if (existing && existing.start_at) {
//       return res.status(400).json({ message: 'Already clocked in today' });
//     }

//     const { data, error } = await supabase
//       .from('attendance')
//       .insert({
//         user_id: userId,
//         date: today,
//         start_at: new Date().toISOString(),
//         status: 'Present'
//       })
//       .select()
//       .single();

//     if (error) throw error;
//     res.json({ message: 'Clocked in successfully', data });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Clock Out
// export const clockOut = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const today = new Date().toISOString().split('T')[0];

//     const { data: attendance } = await supabase
//       .from('attendance')
//       .select('*')
//       .eq('user_id', userId)
//       .eq('date', today)
//       .single();

//     if (!attendance || !attendance.start_at) {
//       return res.status(400).json({ message: 'No clock-in record found' });
//     }

//     if (attendance.end_at) {
//       return res.status(400).json({ message: 'Already clocked out' });
//     }

//     const endTime = new Date();
//     const startTime = new Date(attendance.start_at);
//     const hoursWorked = (endTime - startTime) / (1000 * 60 * 60);

//     const { data, error } = await supabase
//       .from('attendance')
//       .update({
//         end_at: endTime.toISOString(),
//         hours_worked: hoursWorked.toFixed(2)
//       })
//       .eq('id', attendance.id)
//       .select()
//       .single();

//     if (error) throw error;
//     res.json({ message: 'Clocked out successfully', data });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get My Leave Requests
// export const getMyLeaves = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { data, error } = await supabase
//       .from('leave_requests')
//       .select(`
//         *,
//         leave_types(type)
//       `)
//       .eq('user_id', userId)
//       .order('applied_at', { ascending: false });

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Apply for Leave
// export const applyLeave = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { leave_type_id, start_date, end_date, reason } = req.body;

//     const { data, error } = await supabase
//       .from('leave_requests')
//       .insert({
//         user_id: userId,
//         leave_type_id,
//         start_date,
//         end_date,
//         status: 'Pending'
//       })
//       .select()
//       .single();

//     if (error) throw error;
//     res.json({ message: 'Leave request submitted successfully', data });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get My Payroll
// export const getMyPayroll = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { month, year } = req.query;

//     let query = supabase
//       .from('payroll')
//       .select('*')
//       .eq('user_id', userId)
//       .order('generated_at', { ascending: false });

//     if (month && year) {
//       query = query.eq('month', month).eq('year', year);
//     }

//     const { data, error } = await query;

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get My Performance Reviews
// export const getMyPerformance = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { data, error } = await supabase
//       .from('performance_reviews')
//       .select(`
//         *,
//         reviewer:users!performance_reviews_reviewer_id_fkey(username)
//       `)
//       .eq('user_id', userId)
//       .order('review_date', { ascending: false });

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Announcements
// export const getAnnouncements = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('announcements')
//       .select(`
//         *,
//         created_by_user:users!announcements_created_by_fkey(username)
//       `)
//       .order('created_at', { ascending: false })
//       .limit(10);

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get My Team
// export const getMyTeam = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { data, error } = await supabase
//       .from('team_members')
//       .select(`
//         *,
//         teams(
//           *,
//           manager:users!teams_manager_id_fkey(username, email)
//         ),
//         users(username, email, departments(name), designations(title))
//       `)
//       .eq('user_id', userId);

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get My Trainings
// export const getMyTrainings = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { data, error } = await supabase
//       .from('trainings')
//       .select(`
//         *,
//         manager:users!trainings_manager_id_fkey(username)
//       `)
//       .eq('user_id', userId)
//       .order('start_date', { ascending: false });

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get My Skills
// export const getMySkills = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { data, error } = await supabase
//       .from('skills')
//       .select('*')
//       .eq('user_id', userId);

//     if (error) throw error;
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import * as EmployeeModel from '../../models/Employee/employeeModel.js';

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await EmployeeModel.getDashboardStats(userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await EmployeeModel.getEmployeeProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const attendance = await EmployeeModel.getAttendanceRecords(userId);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clockIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const attendance = await EmployeeModel.createAttendance(userId, 'clock_in');
    res.json({ message: 'Clocked in successfully', data: attendance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const clockOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const attendance = await EmployeeModel.createAttendance(userId, 'clock_out');
    res.json({ message: 'Clocked out successfully', data: attendance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyLeaves = async (req, res) => {
  try {
    const userId = req.user.id;
    const leaves = await EmployeeModel.getLeaveRequests(userId);
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaveTypes = async (req, res) => {
  try {
    const leaveTypes = await EmployeeModel.getLeaveTypes();
    res.json(leaveTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { leave_type_id, start_date, end_date } = req.body;
    
    const leave = await EmployeeModel.createLeaveRequest(userId, leave_type_id, start_date, end_date);
    res.json({ message: 'Leave applied successfully', data: leave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyPayroll = async (req, res) => {
  try {
    const userId = req.user.id;
    const payroll = await EmployeeModel.getPayrollRecords(userId);
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPerformance = async (req, res) => {
  try {
    const userId = req.user.id;
    const performance = await EmployeeModel.getPerformanceReviews(userId);
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await EmployeeModel.getAnnouncements();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyMeetings = async (req, res) => {
  try {
    const userId = req.user.id;
    const meetings = await EmployeeModel.getMeetings(userId);
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTrainings = async (req, res) => {
  try {
    const userId = req.user.id;
    const trainings = await EmployeeModel.getTrainings(userId);
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    const userId = req.user.id;
    const assets = await EmployeeModel.getAssets(userId);
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await EmployeeModel.getGoals(userId);
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const team = await EmployeeModel.getTeamMembers(userId);
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySkills = async (req, res) => {
  try {
    const userId = req.user.id;
    const skills = await EmployeeModel.getSkills(userId);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitResignation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notice_period, reason, last_working_day } = req.body;
    
    const noticeDate = new Date().toISOString().split('T')[0];
    const resignation = await EmployeeModel.createResignation(userId, noticeDate, last_working_day, reason);
    
    res.json({ message: 'Resignation submitted successfully', data: resignation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyResignation = async (req, res) => {
  try {
    const userId = req.user.id;
    const resignation = await EmployeeModel.getResignation(userId);
    res.json(resignation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
