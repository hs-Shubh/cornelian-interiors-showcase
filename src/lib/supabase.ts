import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Public Supabase config. The anon key is designed to be exposed in the client
// (row-level security protects the data), so it is the source of truth here —
// this keeps the site working regardless of deploy-env drift.
const SUPABASE_URL = "https://zudwmgyibdkmnsnuvehv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZHdtZ3lpYmRrbW5zbnV2ZWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTM3NDksImV4cCI6MjA4NjIyOTc0OX0.4cTvnf6reuCEByPYTb6KogVKBtLyvpc-zBTUQ3_f-0I";

export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

let clientInstance: SupabaseClient<Database> | null = null;

/**
 * Returns the Supabase client. Never throws.
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (clientInstance) return clientInstance;
  clientInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  return clientInstance;
}
