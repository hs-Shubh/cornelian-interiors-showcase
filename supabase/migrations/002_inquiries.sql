-- Unified inquiries table (custom furniture, CHIITRA, general)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  inquiry_type TEXT,
  product_type TEXT,
  source TEXT,
  page_path TEXT,
  dimensions_text TEXT,
  material TEXT,
  finish TEXT,
  artwork_size TEXT,
  frame_style TEXT,
  reference_image_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_product_type ON public.inquiries(product_type);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
CREATE POLICY "Allow anon insert inquiries" ON public.inquiries FOR INSERT TO anon WITH CHECK (true);
