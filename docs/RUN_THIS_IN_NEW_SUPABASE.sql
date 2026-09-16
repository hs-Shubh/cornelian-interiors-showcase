-- ============================================================================
-- Cornelian — full schema + RLS for project zudwmgyibdkmnsnuvehv
-- Paste this whole file into: Supabase Dashboard → SQL Editor → Run.
-- Idempotent & safe on an existing project: creates the missing design_requests
-- table, (re)applies the anon-insert RLS policies, and adds storage buckets.
-- ============================================================================

-- ── Tables ──────────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  source text
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text not null,
  email text not null,
  phone text,
  message text,
  inquiry_type text,
  product_type text,
  source text,
  page_path text,
  dimensions_text text,
  material text,
  finish text,
  artwork_size text,
  frame_style text,
  reference_image_urls text[] default '{}',
  status text default 'new'
);

create table if not exists public.custom_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  order_id text unique not null,
  product_type text not null,
  width_cm numeric not null,
  height_cm numeric not null,
  depth_cm numeric not null,
  material text,
  finish text,
  notes text,
  image_urls text[] default '{}',
  customer_name text,
  customer_email text,
  customer_phone text,
  status text default 'pending'
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image text,
  seo_title text,
  seo_description text,
  published boolean default false,
  published_at timestamptz
);

create table if not exists public.design_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text, email text, phone text, whatsapp text,
  room_type text,
  length_ft numeric, width_ft numeric, height_ft numeric,
  styles text[] default '{}',
  palette text, budget text, prompt text,
  image_urls text[] default '{}',
  status text default 'new'
);

-- ── Indexes ─────────────────────────────────────────────────────────────────
create index if not exists idx_leads_created_at on public.leads(created_at desc);
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);
create index if not exists idx_custom_orders_created_at on public.custom_orders(created_at desc);
create index if not exists idx_blog_posts_slug on public.blog_posts(slug);

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.leads            enable row level security;
alter table public.inquiries        enable row level security;
alter table public.custom_orders    enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.design_requests  enable row level security;

drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads" on public.leads for insert to anon with check (true);

drop policy if exists "anon insert inquiries" on public.inquiries;
create policy "anon insert inquiries" on public.inquiries for insert to anon with check (true);

drop policy if exists "anon insert custom_orders" on public.custom_orders;
create policy "anon insert custom_orders" on public.custom_orders for insert to anon with check (true);

drop policy if exists "anon insert design_requests" on public.design_requests;
create policy "anon insert design_requests" on public.design_requests for insert to anon with check (true);

drop policy if exists "anon read published blog_posts" on public.blog_posts;
create policy "anon read published blog_posts" on public.blog_posts for select to anon using (published = true);

-- ── Storage buckets (public read; anon upload for inquiry refs) ──────────────
insert into storage.buckets (id, name, public)
  values ('inquiry-refs', 'inquiry-refs', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public)
  values ('design-previews', 'design-previews', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public)
  values ('custom-orders', 'custom-orders', true) on conflict (id) do nothing;

drop policy if exists "anon upload inquiry-refs" on storage.objects;
create policy "anon upload inquiry-refs" on storage.objects
  for insert to anon with check (bucket_id in ('inquiry-refs', 'custom-orders'));

drop policy if exists "public read design buckets" on storage.objects;
create policy "public read design buckets" on storage.objects
  for select to public using (bucket_id in ('inquiry-refs', 'design-previews', 'custom-orders'));
