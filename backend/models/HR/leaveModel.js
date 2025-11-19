// backend/models/leaveModel.js
import supabase from "../../config/supabaseClient.js";

/** ---------- LEAVE TYPES ---------- **/
export async function getLeaveTypes() {
  return supabase
    .from("leave_types")
    .select("id, type")
    .order("type", { ascending: true });
}

export async function createLeaveType(payload) {
  return supabase.from("leave_types").insert(payload).select().single();
}

export async function updateLeaveType(id, payload) {
  return supabase.from("leave_types").update(payload).eq("id", id).select().single();
}

export async function deleteLeaveType(id) {
  return supabase.from("leave_types").delete().eq("id", id);
}

/** ---------- LEAVE REQUESTS ---------- **/
export async function createLeaveRequest(payload) {
  return supabase.from("leave_requests").insert(payload).select().single();
}

export async function getLeaveRequests(filters = {}) {
  let query = supabase
    .from("leave_requests")
    .select(`
      id, user_id, leave_type_id, start_date, end_date, status, applied_at,
      users ( id, username, email ),
      leave_types ( id, type )
    `)
    .order("applied_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.user_id) query = query.eq("user_id", filters.user_id);

  return query;
}

export async function getLeaveRequestById(id) {
  return supabase
    .from("leave_requests")
    .select(`
      id, user_id, leave_type_id, start_date, end_date, status, applied_at,
      users ( id, username, email ),
      leave_types ( id, type )
    `)
    .eq("id", id)
    .single();
}

export async function updateLeaveStatus(id, status) {
  return supabase
    .from("leave_requests")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
}

export async function deleteLeaveRequest(id) {
  return supabase.from("leave_requests").delete().eq("id", id);
}
