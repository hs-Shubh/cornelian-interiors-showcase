-- Leads (contact form submissions)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  source TEXT
);

-- Custom orders (cabinet / furniture)
CREATE TABLE IF NOT EXISTS public.custom_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  order_id TEXT UNIQUE NOT NULL,
  product_type TEXT NOT NULL,
  width_cm NUMERIC NOT NULL,
  height_cm NUMERIC NOT NULL,
  depth_cm NUMERIC NOT NULL,
  material TEXT,
  finish TEXT,
  notes TEXT,
  image_urls TEXT[] DEFAULT '{}',
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  status TEXT DEFAULT 'pending'
);

-- Blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_orders_order_id ON public.custom_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_custom_orders_created_at ON public.custom_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC NULLS LAST);

-- RLS (allow anon insert for leads and custom_orders; allow anon read for blog_posts)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert leads" ON public.leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon insert custom_orders" ON public.custom_orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon read published blog_posts" ON public.blog_posts FOR SELECT TO anon USING (published = true);

-- Storage bucket for custom order images (create in Dashboard: Storage -> New bucket 'custom-orders', public)
-- Optional: create buckets 'projects', 'blogs', 'user-uploads' for future use
