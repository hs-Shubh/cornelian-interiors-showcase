import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

function getEnv() {
  const url = typeof import.meta.env?.VITE_SUPABASE_URL === "string"
    ? import.meta.env.VITE_SUPABASE_URL.trim()
    : "";
  const anonKey = typeof import.meta.env?.VITE_SUPABASE_ANON_KEY === "string"
    ? import.meta.env.VITE_SUPABASE_ANON_KEY.trim()
    : "";
  return { url, anonKey };
}

export const isSupabaseConfigured = ((): boolean => {
  const { url, anonKey } = getEnv();
  return url.length > 0 && anonKey.length > 0;
})();

let clientInstance: SupabaseClient<Database> | null = null;

/**
 * Returns the Supabase client when env vars are set; otherwise null. Never throws.
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (clientInstance) return clientInstance;
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return null;
  clientInstance = createClient<Database>(url, anonKey);
  return clientInstance;
}
