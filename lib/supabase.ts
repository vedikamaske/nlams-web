import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eopygcxliankdmnfermi.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_fVCZfg2F0VO2vCzP_ua-TQ_gdXuiHSG";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
