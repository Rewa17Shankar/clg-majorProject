// backend/models/resignationModel.js
import supabase from "../../config/supabaseClient.js";

const NOTICE_PERIOD_DAYS = 60; // 2 months approx

const Resignation = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("resignations")
      .select(`
        id,
        user_id,
        notice_date,
        last_working_date,
        reason,
        status,
        created_at,
        users (username, email)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const today = new Date();

    return data.map((r) => {
      const noticeDate = new Date(r.notice_date);
      const lastWorking = new Date(r.last_working_date);
      const diffDays = (lastWorking - today) / (1000 * 60 * 60 * 24);
      const withinNoticePeriod = diffDays >= NOTICE_PERIOD_DAYS ? true : false;

      // Automatically reject if last_working_date < notice period
      const status =
        r.status === "Pending" && !withinNoticePeriod ? "Rejected" : r.status;

      return {
        id: r.id,
        user_id: r.user_id,
        username: r.users?.username || null,
        email: r.users?.email || null,
        notice_date: r.notice_date,
        last_working_date: r.last_working_date,
        reason: r.reason,
        status,
        withinNoticePeriod,
        created_at: r.created_at,
      };
    });
  },

  create: async ({ user_id, notice_date, last_working_date, reason }) => {
    const { data, error } = await supabase
      .from("resignations")
      .insert([{ user_id, notice_date, last_working_date, reason }])
      .select("id, user_id, notice_date, last_working_date, reason, status, created_at")
      .single();

    if (error) throw error;
    return data;
  },

  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from("resignations")
      .update({ status })
      .eq("id", id)
      .select("id, user_id, notice_date, last_working_date, reason, status, created_at")
      .single();

    if (error) throw error;
    return data;
  },

  getByUser: async (user_id) => {
    const { data, error } = await supabase
      .from("resignations")
      .select("id, user_id, notice_date, last_working_date, reason, status, created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

export default Resignation;
