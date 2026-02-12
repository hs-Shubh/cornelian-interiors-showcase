import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { CustomOrderInsert } from "@/types/supabase";

const BUCKET = "custom-orders";

export function isOrdersApiConfigured(): boolean {
  return isSupabaseConfigured;
}

export function generateOrderId(): string {
  const prefix = "CEI";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function uploadOrderImages(orderId: string, files: File[]): Promise<string[]> {
  if (!isSupabaseConfigured || files.length === 0) return [];
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${orderId}/${Date.now()}-${i}.${ext}`;
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

export async function submitCustomOrder(
  payload: Omit<CustomOrderInsert, "id" | "created_at" | "image_urls"> & { image_urls?: string[] }
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Backend not configured" };
  }
  const { error } = await supabase.from("custom_orders").insert({
    order_id: payload.order_id,
    product_type: payload.product_type,
    width_cm: payload.width_cm,
    height_cm: payload.height_cm,
    depth_cm: payload.depth_cm,
    material: payload.material ?? null,
    finish: payload.finish ?? null,
    notes: payload.notes ?? null,
    image_urls: payload.image_urls ?? [],
    customer_name: payload.customer_name ?? null,
    customer_email: payload.customer_email ?? null,
    customer_phone: payload.customer_phone ?? null,
    status: payload.status ?? "pending",
  });
  if (error) return { success: false, error: error.message };
  return { success: true, orderId: payload.order_id };
}
