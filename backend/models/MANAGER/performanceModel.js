import supabase from "../../config/supabaseClient.js";

const PerformanceModel = {
  // Add a performance review
  async addReview({ user_id, reviewer_id, rating, feedback }) {
    const { data, error } = await supabase
      .from("performance_reviews")
      .insert([{ user_id, reviewer_id, rating, feedback }])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Get reviews for a specific employee
  async getReviewsByUser(user_id) {
    const { data, error } = await supabase
      .from("performance_reviews")
      .select("*, reviewer:users(username)")
      .eq("user_id", user_id);

    if (error) throw error;
    return data;
  },

  // Get all performance reviews
async getAllReviews() {
  const { data, error } = await supabase
    .from("performance_reviews")
    .select(`
      id, rating, feedback, review_date,
      user:users!performance_reviews_user_id_fkey(username),
      reviewer:users!performance_reviews_reviewer_id_fkey(username)
    `)
    .order("review_date", { ascending: false });

  if (error) throw error;
  return data;
}

};

export default PerformanceModel;
