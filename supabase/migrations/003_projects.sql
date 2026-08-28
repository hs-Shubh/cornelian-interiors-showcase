-- Projects (portfolio) — mirrors src/types/project.ts
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  flagship BOOLEAN DEFAULT false,

  -- Overview / facts
  category TEXT NOT NULL DEFAULT 'Residential',
  client TEXT,
  city TEXT,
  location TEXT,
  size TEXT,
  budget TEXT,
  year TEXT,
  scope_of_work TEXT[] DEFAULT '{}',
  description TEXT,

  -- Brands / materials used: [{ name, category, logo }]
  brands JSONB DEFAULT '[]',

  -- Media
  thumbnail TEXT,
  images JSONB DEFAULT '[]',       -- 3D renders:   [{ src, caption }]
  site_photos JSONB DEFAULT '[]',  -- on-site:      [{ src, caption }]
  floor_plans JSONB DEFAULT '[]',  -- drawings:     [{ src, label }]
  elevations JSONB DEFAULT '[]',   -- drawings:     [{ src, label }]
  videos JSONB DEFAULT '[]',       -- walkthroughs: [{ src, poster, title }]

  -- Optional scroll fly-through frame sequence
  walkthrough_base TEXT,
  walkthrough_count INTEGER,

  -- Publishing
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_projects_sort ON public.projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_flagship ON public.projects(flagship) WHERE flagship = true;

-- RLS: public site reads published projects; writes happen via authenticated admin / dashboard.
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read published projects"
  ON public.projects FOR SELECT TO anon USING (published = true);

-- Storage buckets to create in the Supabase Dashboard (Storage → New bucket, public read):
--   'project-media'   -> 3D renders, site photos, floor plans, elevations, brand logos
--   'project-videos'  -> walkthrough / drone videos
--   'project-frames'  -> scroll fly-through frame sequences (frame_0001.jpg …)
--
-- Upload flow: add files to the bucket, then reference their public URLs in the
-- JSONB columns above (images/site_photos/floor_plans/elevations/videos) or in
-- walkthrough_base/walkthrough_count for the immersive fly-through.
