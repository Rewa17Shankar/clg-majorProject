// import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error("Supabase URL or Key is missing!");
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default supabase;

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Add DEFAULT export (so old imports still work):
export default supabase;

console.log('✅ Supabase client initialized');
