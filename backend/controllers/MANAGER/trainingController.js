import supabase from "../../config/supabaseClient.js";

// Get all trainings
export const getTrainings = async (req, res) => {
  try {
    const { data, error } = await supabase.from("trainings").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create training
export const createTraining = async (req, res) => {
  try {
    const { title, description, user_id, manager_id, start_date, end_date, material_link, resource_type } = req.body;

    // compute status initially
    const today = new Date();
    const s = new Date(start_date);
    const e = new Date(end_date);
    let status = 'upcoming';
    if (today >= s && today <= e) status = 'ongoing';
    if (today > e) status = 'completed';

    const { data, error } = await supabase.from("trainings").insert([
      { title, description, user_id, manager_id, start_date, end_date, status, progress: 0, material_link, resource_type }
    ]).select();

    if (error) throw error;

    const training = data[0];

    // create notification for the employee
    await supabase.from("notifications").insert([{
      user_id,
      title: `New Training Assigned: ${title}`,
      message: `You have been assigned a training "${title}". Check Trainings page.`,
    }]);

    res.status(201).json(training);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PATCH /api/trainings/:id/progress
export const updateTrainingProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, status, material_link, resource_type } = req.body;

    const updates = {};
    if (progress !== undefined) updates.progress = progress;
    if (status) updates.status = status;
    if (material_link !== undefined) updates.material_link = material_link;
    if (resource_type !== undefined) updates.resource_type = resource_type;

    const { data, error } = await supabase.from("trainings").update(updates).eq("id", id).select();
    if (error) throw error;

    // optionally notify employee when marked complete
    if (updates.status === 'completed') {
      const training = data[0];
      await supabase.from('notifications').insert([{
        user_id: training.user_id,
        title: `Training Completed: ${training.title}`,
        message: `Your training "${training.title}" has been marked completed.`,
      }]);
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

