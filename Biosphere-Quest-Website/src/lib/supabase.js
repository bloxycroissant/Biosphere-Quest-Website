import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://cpweixlfujzsdgfupcta.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_xmYBGMbLu_V1EHxvLEPQaQ_v1vZYt5V";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);