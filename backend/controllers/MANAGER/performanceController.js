import  PerformanceModel  from "../../models/MANAGER/performanceModel.js";

export const addReview = async (req, res) => {
  try {
    const { user_id, reviewer_id, rating, feedback } = req.body;
    if (!user_id || !reviewer_id || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const review = await PerformanceModel.addReview({
      user_id,
      reviewer_id,
      rating,
      feedback,
    });
    res.json(review);
  } catch (err) {
    console.error("Error in addReview:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await PerformanceModel.getReviewsByUser(userId);
    res.json(reviews);
  } catch (err) {
    console.error("Error in getReviewsByUser:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await PerformanceModel.getAllReviews();
    res.json(reviews);
  } catch (err) {
    console.error("Supabase error in getAllReviews:", err); // 👈 will show hint + details
    res.status(500).json({
      error: err.message,
      details: err.details || null,
      hint: err.hint || null,
    });
  }
};

