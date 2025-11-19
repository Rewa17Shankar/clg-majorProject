import supabase from "../../config/supabaseClient.js";

export const getMyTrainings = async (req, res) => {
  try {
    const userId = req.user.id;   // JWT se aa raha hai

    const { data, error } = await supabase
      .from("trainings")
      .select("*")
      .eq("user_id", userId)     // Sirf employee ki training
      .order("start_date", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const submitTrainingFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { training_id, rating, comments } = req.body;

    const { data, error } = await supabase.from('training_feedback').insert([{
      training_id, user_id: userId, rating, comments
    }]).select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

