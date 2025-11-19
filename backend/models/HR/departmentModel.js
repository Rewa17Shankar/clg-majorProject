// // // backend/models/departmentModel.js
// // import supabase from "../../config/supabaseClient.js";

// // // ✅ Get all departments
// // export const getAllDepartments = async () => {
// //   const { data, error } = await supabase
// //     .from("departments")
// //     .select("id, name")
// //     .order("id", { ascending: true });

// //   if (error) throw error;
// //   return data;
// // };

// // // ✅ Add new department
// // export const addDepartment = async (department_name) => {
// //   const { data, error } = await supabase
// //     .from("departments")
// //     .insert([{ name: department_name }])
// //     .select()
// //     .single();

// //   if (error) throw error;
// //   return data;
// // };

// // // ✅ Update department name
// // export const updateDepartment = async (id, department_name) => {
// //   const { data, error } = await supabase
// //     .from("departments")
// //     .update({ name: department_name })
// //     .eq("id", id)
// //     .select()
// //     .single();

// //   if (error) throw error;
// //   return data;
// // };

// // // ✅ Delete department
// // export const deleteDepartment = async (id) => {
// //   const { error } = await supabase.from("departments").delete().eq("id", id);

// //   if (error) throw error;
// //   return { message: "Department deleted successfully" };
// // };



// // backend/models/departmentModel.js
// import supabase from "../../config/supabaseClient.js";

// // ✅ Get all departments
// export const getAllDepartments = async () => {
//   const { data, error } = await supabase
//     .from("departments")
//     .select("id, name")
//     .order("id", { ascending: true });

//   if (error) throw error;
//   return data;
// };

// // ✅ Add new department
// export const addDepartment = async (department_name) => {
//   const { data, error } = await supabase
//     .from("departments")
//     .insert([{ name: department_name }])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// // ✅ Update department name
// export const updateDepartment = async (id, department_name) => {
//   const { data, error } = await supabase
//     .from("departments")
//     .update({ name: department_name })
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// // ✅ Delete department
// export const deleteDepartment = async (id) => {
//   const { error } = await supabase.from("departments").delete().eq("id", id);

//   if (error) throw error;
//   return { message: "Department deleted successfully" };
// };




import supabase from "../../config/supabaseClient.js";

// ✅ Get all departments
export const getAllDepartments = async () => {
  const { data, error } = await supabase
    .from("departments")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

// ✅ Add new department
export const addDepartment = async (department_name) => {
  const { data, error } = await supabase
    .from("departments")
    .insert([{ name: department_name }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ✅ Update department name
export const updateDepartment = async (id, department_name) => {
  const { data, error } = await supabase
    .from("departments")
    .update({ name: department_name })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ✅ Delete department
export const deleteDepartment = async (id) => {
  const { error } = await supabase.from("departments").delete().eq("id", id);

  if (error) throw error;
  return { message: "Department deleted successfully" };
};

// ✅ Get designations by department
export const getDesignationsByDept = async (deptId) => {
  const { data, error } = await supabase
    .from("designations")
    .select("*")
    .eq("department_id", deptId);

  if (error) throw error;
  return data;
};
