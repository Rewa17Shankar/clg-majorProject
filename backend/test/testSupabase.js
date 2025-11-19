import { supabase } from "../config/supabaseClient.js";

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");
    
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Supabase error:", error);
      return;
    }

    console.log("✅ Supabase connection OK!");
    console.log("✅ Found teams:", data.length);
  } catch (err) {
    console.error("❌ Test error:", err);
  }
}

testConnection();
