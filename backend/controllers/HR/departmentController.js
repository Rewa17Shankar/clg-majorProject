// // controllers/departmentController.js
// import supabase from "../../config/supabaseClient.js";

// export const getDepartments = async (req, res) => {
//   const { data, error } = await supabase.from("departments").select("*");
//   if (error) return res.status(400).json({ error: error.message });
//   res.json(data);
// };

// export const getDesignationsByDept = async (req, res) => {
//   const { deptId } = req.params;
//   const { data, error } = await supabase
//     .from("designations")
//     .select("*")
//     .eq("department_id", deptId);

//   if (error) return res.status(400).json({ error: error.message });
//   res.json(data);
// };


// controllers/departmentController.js
import supabase from "../../config/supabaseClient.js";

export const getDepartments = async (req, res) => {
  const { data, error } = await supabase.from("departments").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getDesignationsByDept = async (req, res) => {
  const { deptId } = req.params;
  const { data, error } = await supabase
    .from("designations")
    .select("*")
    .eq("department_id", deptId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// ✅ Get all users with department names (JOIN)
export const getUsersWithDepartments = async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select(`
      id,
      username,
      email,
      role,
      department_id,
      departments (
        id,
        name
      )
    `)
    .order("id", { ascending: true });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
