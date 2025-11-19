// backend/models/jobModel.js
import supabase from "../../config/supabaseClient.js";

const Job = {
  // ✅ Get all job postings with department name
  getAll: async () => {
    const { data, error } = await supabase
      .from("job_postings")
      .select("id, title, description, department_id, posted_at, departments(name)")
      .order("posted_at", { ascending: false });

    if (error) throw error;

    // Format: include department name clearly
    return data.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      department_id: job.department_id,
      department_name: job.departments?.name || null,
      posted_at: job.posted_at,
    }));
  },

  // ✅ Create new job posting
  create: async ({ title, description, department_id }) => {
    const { data, error } = await supabase
      .from("job_postings")
      .insert([{ title, description, department_id }])
      .select("id, title, description, department_id, posted_at")
      .single();

    if (error) throw error;
    return data;
  },
};

export default Job;
