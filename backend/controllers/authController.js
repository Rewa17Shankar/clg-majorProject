import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword, role }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: "User registered", user: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !users) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: users.id,username: users.username, role: users.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // res.json({ message: "Login successful", token, role: users.role });
    res.json({
      userId: users.id,
      username: users.username,
      roleId: users.role_id,
      token, // ✅ include JWT here
      mustReset: users.must_reset,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
