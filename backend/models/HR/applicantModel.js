// backend/models/applicantModel.js
import supabase from "../../config/supabaseClient.js";

const Applicant = {
  // ✅ Get applicants by Job ID
  getByJob: async (job_id) => {
    const { data, error } = await supabase
      .from("applicants")
      .select("id, name, email, resume_url, status, job_id")
      .eq("job_id", job_id)
      .order("id", { ascending: true });

    if (error) throw error;
    return data;
  },

  // ✅ Apply for a Job (create applicant)
  apply: async ({ job_id, name, email, resume_url }) => {
    const { data, error } = await supabase
      .from("applicants")
      .insert([{ job_id, name, email, resume_url }])
      .select("id, name, email, resume_url, status, job_id")
      .single();

    if (error) throw error;
    return data;
  },

  // ✅ Update Applicant Status
  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from("applicants")
      .update({ status })
      .eq("id", id)
      .select("id, name, email, resume_url, status, job_id")
      .single();

    if (error) throw error;
    return data;
  },
};

export default Applicant;
