import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Public Supabase config. The anon key is designed to be exposed in the client
// (row-level security protects the data), so it is safe to keep here as the
// source of truth — this avoids the site breaking when a deploy env var is
// missing or stale.
const SUPABASE_URL = "https://jsstzjomrfdebvjutnvp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzc3R6am9tcmZkZWJ2anV0bnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NzU1MzgsImV4cCI6MjEwNTA1MTUzOH0.mhOroDMt2m_cIAst_eRqPX6RQSWLOQDo9DZOU2bahIY";

// Retired project ref — if a stale deploy env var still points here, ignore it.
const RETIRED_REF = "zudwmgyibdkmnsnuvehv";

function getEnv() {
  const envUrl =
    typeof import.meta.env?.VITE_SUPABASE_URL === "string"
      ? import.meta.env.VITE_SUPABASE_URL.trim()
      : "";
  const envKey =
    typeof import.meta.env?.VITE_SUPABASE_ANON_KEY === "string"
      ? import.meta.env.VITE_SUPABASE_ANON_KEY.trim()
      : "";

  // Honor a valid env override; otherwise fall back to the baked-in project.
  const useEnv = envUrl && envKey && !envUrl.includes(RETIRED_REF);
  return {
    url: useEnv ? envUrl : SUPABASE_URL,
    anonKey: useEnv ? envKey : SUPABASE_ANON_KEY,
  };
}

export const isSupabaseConfigured = ((): boolean => {
  const { url, anonKey } = getEnv();
  return url.length > 0 && anonKey.length > 0;
})();

let clientInstance: SupabaseClient<Database> | null = null;

/**
 * Returns the Supabase client. Never throws.
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (clientInstance) return clientInstance;
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return null;
  clientInstance = createClient<Database>(url, anonKey);
  return clientInstance;
}
