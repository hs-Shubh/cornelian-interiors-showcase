-- Run this in Supabase → SQL Editor (project zudwmgyibdkmnsnuvehv).
-- Fixes anon INSERT (forms were blocked by RLS) + adds storage buckets + the
-- AI design-generator table.

-- ── Anon INSERT policies (idempotent) ─────────────────────────────────
alter table public.leads enable row level security;
alter table public.inquiries enable row level security;
alter table public.custom_orders enable row level security;

drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads" on public.leads
  for insert to anon with check (true);

drop policy if exists "anon insert inquiries" on public.inquiries;
create policy "anon insert inquiries" on public.inquiries
  for insert to anon with check (true);

drop policy if exists "anon insert custom_orders" on public.custom_orders;
create policy "anon insert custom_orders" on public.custom_orders
  for insert to anon with check (true);

-- ── Storage buckets (public read) ─────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('inquiry-refs', 'inquiry-refs', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public)
  values ('design-previews', 'design-previews', true) on conflict (id) do nothing;

drop policy if exists "anon upload inquiry-refs" on storage.objects;
create policy "anon upload inquiry-refs" on storage.objects
  for insert to anon with check (bucket_id = 'inquiry-refs');

drop policy if exists "public read design buckets" on storage.objects;
create policy "public read design buckets" on storage.objects
  for select to public using (bucket_id in ('inquiry-refs', 'design-previews'));

-- ── AI design-generator requests ──────────────────────────────────────
create table if not exists public.design_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text,
  email text,
  phone text,
  whatsapp text,
  room_type text,
  length_ft numeric,
  width_ft numeric,
  height_ft numeric,
  styles text[] default '{}',
  palette text,
  budget text,
  prompt text,
  image_urls text[] default '{}',
  status text default 'new'
);
alter table public.design_requests enable row level security;
drop policy if exists "anon insert design_requests" on public.design_requests;
create policy "anon insert design_requests" on public.design_requests
  for insert to anon with check (true);
