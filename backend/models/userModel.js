// import supabase from "../config/supabaseClient.js";

// // ✅ Get all users with department + role join
// export const getAllUsers = async () => {
//   const { data, error } = await supabase
//     .from("users")
//     .select(`
//       id,
//       username,
//       email,
//       department_id,
//       designation_id,
//       date_of_joining,
//       roles (role_name),
//       departments (name)
//     `)
//     .order("id", { ascending: true });

//   if (error) throw error;

//   // flatten role and department
//   return data.map((u) => ({
//     id: u.id,
//     username: u.username,
//     email: u.email,
//     role: u.roles?.role_name || "N/A",
//     department: u.departments?.name || "None",
//     department_id: u.department_id,
//     designation_id: u.designation_id,
//     date_of_joining: u.date_of_joining,
//   }));
// };


// export const getAllUsersWithDepartment = async () => {
//   const { data, error } = await supabase
//     .from("users")
//     .select("id, username, email, department_id, departments(name), roles(role_name)")
//     .order("id", { ascending: true });

//   if (error) throw error;

//   return data.map((u) => ({
//     id: u.id,
//     username: u.username,
//     email: u.email,
//     department_id: u.department_id,
//     department_name: u.departments?.name || null, // ✅ use name from DB
//     role: u.roles?.role_name || "User",
//   }));
// };

// export const updateUserDesignation = async (userId, designationId) => {
//   const { error } = await supabase
//     .from("users")
//     .update({ designation_id: designationId })
//     .eq("id", userId);
//   if (error) throw error;
// };

// // Update user department
// export const updateUserDepartment = async (userId, departmentId) => {
//   const { data, error } = await supabase
//     .from("users")
//     .update({ department_id: departmentId })
//     .eq("id", userId)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// // ➡️ Insert new user
// export const createUser = async ({ name, email, role, password }) => {
//   const { data, error } = await supabase
//     .from("users")
//     .insert([{ name, email, role, password }])
//     .select();

//   if (error) throw new Error(error.message);
//   return data[0];
// };

// // ➡️ Get user counts by role
// export const getUserCountsModel = async () => {
//   const roles = ["HR", "Manager", "Employee"];
//   const counts = {};

//   for (const role of roles) {
//     const { count, error } = await supabase
//       .from("users")
//       .select("*", { count: "exact", head: true })
//       .eq("role", role);

//     if (error) throw new Error(error.message);
//     counts[role] = count;
//   }

//   return counts;
// };



import supabase from "../config/supabaseClient.js";

// ✅ Get all users with department + role join
// export const getAllUsers = async () => {
//   const { data, error } = await supabase
//     .from("users")
//     .select(`
//       id,
//       username,
//       email,
//       department_id,
//       designation_id,
//       date_of_joining,
//       roles (role_name),
//       departments (name)
//     `)
//     .order("id", { ascending: true });

//   if (error) throw error;

//   // Flatten role and department
//   return data.map((u) => ({
//     id: u.id,
//     username: u.username,
//     email: u.email,
//     role: u.roles?.role_name || "N/A",
//     department: u.departments?.name || "None",
//     department_id: u.department_id,
//     designation_id: u.designation_id,
//     date_of_joining: u.date_of_joining,
//   }));
// };

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select(`
      id,
      username,
      email,
      department_id,
      designation_id,
      date_of_joining,
      roles (
        id,
        role_name
      ),
      departments (
        id,
        name
      ),
      designations (
        id,
        title,
        department_id
      )
    `)
    .order("id", { ascending: true });

  if (error) throw error;

  // Flatten structure for easier frontend use
  return data.map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.roles?.role_name || "N/A",
    role_id: u.roles?.id || null,
    department: u.departments?.name || "None",
    department_id: u.department_id,
    designation: u.designations?.title || "Not Assigned",
    designation_id: u.designation_id,
    designation_department_id: u.designations?.department_id || null,
    date_of_joining: u.date_of_joining,
  }));
};

// ✅ Get all users with department (simplified version)
export const getAllUsersWithDepartment = async () => {
  const { data, error } = await supabase
    .from("users")
    .select(`id, username, email, department_id, departments(name), roles(role_name)`)
    .order("id", { ascending: true });

  if (error) throw error;

  return data.map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
    department_id: u.department_id,
    department: u.departments?.name || "None",
    role: u.roles?.role_name || "User",
  }));
};

// ✅ Update user department and return updated data with join
export const updateUserDepartment = async (userId, departmentId) => {
  const { data, error } = await supabase
    .from("users")
    .update({ department_id: departmentId === "" ? null : departmentId })
    .eq("id", userId)
    .select(`
      id,
      username,
      email,
      department_id,
      departments(name),
      roles(role_name)
    `)
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    department_id: data.department_id,
    department: data.departments?.name || "None",
    role: data.roles?.role_name || "User",
  };
};

// ✅ Update user designation
export const updateUserDesignation = async (userId, designationId) => {
  const { data, error } = await supabase
    .from("users")
    .update({ designation_id: designationId === "" ? null : designationId })
    .eq("id", userId)
    .select(`
      id,
      username,
      email,
      department_id,
      designation_id,
      departments(name),
      designations(id, title, department_id),
      roles(role_name)
    `)
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    department_id: data.department_id,
    department: data.departments?.name || "None",
    designation_id: data.designation_id,
    designation: data.designations?.title || "Not Assigned",
    role: data.roles?.role_name || "User",
  };
};

// ✅ Insert new user
export const createUser = async ({ name, email, role, password }) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, role, password }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

// ✅ Get user counts by role
export const getUserCountsModel = async () => {
  const roles = ["HR", "Manager", "Employee"];
  const counts = {};

  for (const role of roles) {
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", role);

    if (error) throw new Error(error.message);
    counts[role] = count;
  }

  return counts;
};
