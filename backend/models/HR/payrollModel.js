import supabase from "../../config/supabaseClient.js";

class Payroll {
  /** Add bonus for a user */
  static async addBonus(user_id, amount, reason) {
    const { data, error } = await supabase
      .from("bonuses")
      .insert([{ user_id, amount, reason }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  /** Add deduction for a user */
  static async addDeduction(user_id, amount, reason) {
    const { data, error } = await supabase
      .from("deductions")
      .insert([{ user_id, amount, reason }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  /** Update payroll salary (HR adjustment) */
  static async updatePayroll(id, salary) {
    const { data, error } = await supabase
      .from("payroll")  // fixed table name
      .update({ salary })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  /** Get all payrolls (with user info) */
  static async getAll() {
    const { data, error } = await supabase
      .from("payroll") // fixed table name
      .select(`
        *,
        users:users(id, username, email)
      `)
      .order("generated_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data.map((p) => ({
      ...p,
      username: p.users?.username,
      email: p.users?.email,
    }));
  }

  /** Get payrolls for a specific user */
  static async getByUser(user_id) {
    const { data, error } = await supabase
      .from("payroll") // fixed table name
      .select(`
        *,
        users:users(id, username, email)
      `)
      .eq("user_id", user_id)
      .order("generated_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data.map((p) => ({
      ...p,
      username: p.users?.username,
      email: p.users?.email,
    }));
  }

  /** Calculate net salary (base + bonuses - deductions) */
  static async calculateNetSalary(user_id, baseSalary) {
    // Fetch bonuses
    const { data: bonuses, error: bonusErr } = await supabase
      .from("bonuses")
      .select("amount")
      .eq("user_id", user_id);
    if (bonusErr) throw new Error(bonusErr.message);

    const totalBonus = bonuses?.reduce((sum, b) => sum + Number(b.amount), 0) || 0;

    // Fetch deductions
    const { data: deductions, error: dedErr } = await supabase
      .from("deductions")
      .select("amount")
      .eq("user_id", user_id);
    if (dedErr) throw new Error(dedErr.message);

    const totalDeduction =
      deductions?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

    return Number(baseSalary) + totalBonus - totalDeduction;
  }

  /** Generate a new payroll record */
  static async generate({ user_id, salary, month, year }) {
    const { data, error } = await supabase
      .from("payroll") // fixed table name
      .insert([
        {
          user_id,
          salary,
          month,
          year,
          generated_at: new Date().toISOString(),
        },
      ])
      .select(`
        *,
        users:users(id, username, email)
      `)
      .single();

    if (error) throw new Error(error.message);

    return {
      ...data,
      username: data.users?.username,
      email: data.users?.email,
    };
  }
}

export default Payroll;
