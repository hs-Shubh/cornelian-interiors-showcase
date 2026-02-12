import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { LeadInsert } from "@/types/supabase";

export async function submitLead(data: LeadInsert): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Backend not configured" };
  }
  const { error } = await supabase.from("leads").insert({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    message: data.message,
    source: data.source ?? "contact",
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}
