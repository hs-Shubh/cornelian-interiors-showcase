import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryInsert } from "@/types/supabase";

const BUCKET = "inquiry-refs";

export function isInquiriesApiConfigured(): boolean {
  return isSupabaseConfigured;
}

export async function uploadInquiryImages(
  prefix: string,
  files: File[]
): Promise<string[]> {
  const supabase = getSupabaseClient();
  if (!supabase || files.length === 0) return [];
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${prefix}/${Date.now()}-${i}.${ext}`;
    const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) continue;
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
    urls.push(urlData.publicUrl);
  }
  return urls;
}

export async function submitInquiry(
  payload: InquiryInsert
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Backend not configured" };
  }
  const { error } = await supabase.from("inquiries").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? null,
    message: payload.message ?? null,
    inquiry_type: payload.inquiry_type ?? null,
    product_type: payload.product_type ?? null,
    source: payload.source ?? null,
    page_path: payload.page_path ?? null,
    dimensions_text: payload.dimensions_text ?? null,
    material: payload.material ?? null,
    finish: payload.finish ?? null,
    artwork_size: payload.artwork_size ?? null,
    frame_style: payload.frame_style ?? null,
    reference_image_urls: payload.reference_image_urls ?? [],
    status: payload.status ?? "new",
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}
