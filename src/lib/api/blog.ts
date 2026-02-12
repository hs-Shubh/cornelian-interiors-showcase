import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { BlogPost } from "@/types/supabase";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as BlogPost[];
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error || !data) return null;
  return data as BlogPost;
}
