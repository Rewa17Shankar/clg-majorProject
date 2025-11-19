// import supabase from "../../config/supabaseClient.js";

// // Fetch payroll for all users (HR dashboard)
// // export const getPayrollForHR = async (req, res) => {
// //   try {
// //     const { data, error } = await supabase
// //       .from("payroll")
// //       .select(`
// //         id,
// //         user_id,
// //         base_salary,
// //         month,
// //         year,
// //         days_present,
// //         overtime_hours,
// //         total_salary,
// //         generated_at,
// //         users (
// //           username,
// //           role_id
// //         )
// //       `)
// //       .order("year", { ascending: false })
// //       .order("month", { ascending: false });

// //     if (error) throw error;

// //     // Flatten data
// //     const payroll = data.map((p) => ({
// //       id: p.id,
// //       user_id: p.user_id,
// //       username: p.users.username,
// //       role_id: p.users.role_id,
// //       base_salary: p.base_salary,
// //       month: p.month,
// //       year: p.year,
// //       days_present: p.days_present,
// //       overtime_hours: p.overtime_hours,
// //       total_salary: p.total_salary,
// //       generated_at: p.generated_at,
// //     }));

// //     res.json(payroll);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Failed to fetch payroll data" });
// //   }
// // };
// export const getPayrollForHR = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("payroll")
//       .select(`
//         id,
//         user_id,
//         base_salary,
//         month,
//         year,
//         days_present,
//         overtime_hours,
//         total_salary,
//         generated_at,
//         users:users (
//           username,
//           role_id
//         )
//       `)
//       .order("month", { ascending: false })
//       .order("year", { ascending: false });

//     if (error) throw error;

//     const payroll = data.map((p) => ({
//       id: p.id,
//       user_id: p.user_id,
//       username: p.users?.username || "N/A",
//       role_id: p.users?.role_id || 0,
//       base_salary: p.base_salary,
//       month: p.month,
//       year: p.year,
//       days_present: p.days_present,
//       overtime_hours: p.overtime_hours,
//       total_salary: p.total_salary,
//       generated_at: p.generated_at,
//     }));

//     res.json(payroll);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch payroll data" });
//   }
// };

import { supabase } from "../../config/supabaseClient.js";

// Get all payroll records (HR view)
export const getPayrollForHR = async (req, res) => {
  try {
    console.log('💰 Fetching payroll for HR...');

    const { data, error } = await supabase
      .from("payroll")
      .select(`
        id,
        user_id,
        base_salary,
        month,
        year,
        days_present,
        overtime_hours,
        total_salary,
        generated_at,
        users:users (
          username,
          email,
          role_id
        )
      `)
      .order("year", { ascending: false })
      .order("month", { ascending: false });

    if (error) throw error;

    // Flatten data
    const payroll = (data || []).map((p) => ({
      id: p.id,
      user_id: p.user_id,
      username: p.users?.username || "N/A",
      email: p.users?.email || "N/A",
      role_id: p.users?.role_id || 0,
      base_salary: p.base_salary,
      month: p.month,
      year: p.year,
      days_present: p.days_present,
      overtime_hours: p.overtime_hours,
      total_salary: p.total_salary,
      generated_at: p.generated_at,
    }));

    console.log('✅ Payroll records:', payroll.length);

    res.json(payroll);
  } catch (err) {
    console.error('❌ Error fetching payroll:', err);
    res.status(500).json({ error: "Failed to fetch payroll data" });
  }
};

// Create payroll
export const createPayroll = async (req, res) => {
  try {
    console.log('💾 Creating payroll:', req.body);

    const { 
      user_id, 
      base_salary, 
      days_present, 
      overtime_hours = 0, 
      month, 
      year, 
      total_salary 
    } = req.body;

    // Validation
    if (!user_id || !base_salary || !days_present || !month || !year) {
      return res.status(400).json({ 
        error: "Missing required fields: user_id, base_salary, days_present, month, year" 
      });
    }

    // Calculate total if not provided
    const calculatedTotal = total_salary || 
      (parseFloat(base_salary) / 30) * days_present + (overtime_hours * 500);

    const { data, error } = await supabase
      .from("payroll")
      .insert([{
        user_id,
        base_salary: parseFloat(base_salary),
        days_present: parseInt(days_present),
        overtime_hours: parseFloat(overtime_hours),
        month: parseInt(month),
        year: parseInt(year),
        total_salary: calculatedTotal,
        generated_at: new Date().toISOString(),
      }])
      .select();

    if (error) throw error;

    console.log('✅ Payroll created:', data[0]?.id);

    res.json({ 
      message: "Payroll created successfully", 
      data: data[0] 
    });
  } catch (err) {
    console.error('❌ Error creating payroll:', err);
    res.status(400).json({ error: err.message });
  }
};
