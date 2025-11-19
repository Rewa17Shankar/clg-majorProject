// backend/models/designationModel.js
import supabase from "../../config/supabaseClient.js";

// ✅ Get all designations with department name
export const getAllDesignations = async () => {
  const { data, error } = await supabase
    .from("designations")
    .select("id, title, department_id, departments(name)")
    .order("id", { ascending: true });

  if (error) throw error;

  // Format response: include department name as well
  return data.map((d) => ({
    id: d.id,
    title: d.title,
    department_id: d.department_id,
    department_name: d.departments?.name || null,
  }));
};

// ✅ Add new designation
export const addDesignation = async (designation_name, department_id) => {
  const { data, error } = await supabase
    .from("designations")
    .insert([{ title: designation_name, department_id }])
    .select("id, title, department_id")
    .single();

  if (error) throw error;
  return data;
};

// ✅ Update designation title or department
export const updateDesignation = async (id, designation_name, department_id) => {
  const { data, error } = await supabase
    .from("designations")
    .update({ title: designation_name, department_id })
    .eq("id", id)
    .select("id, title, department_id")
    .single();

  if (error) throw error;
  return data;
};

// ✅ Delete designation
export const deleteDesignation = async (id) => {
  const { error } = await supabase.from("designations").delete().eq("id", id);

  if (error) throw error;
  return { message: "Designation deleted successfully" };
};
