# Implementation summary – Cornelian Executive Interiors

## 1. Files created and changed

### Created
- `src/lib/api/inquiries.ts` – inquiry submit + image upload (inquiry-refs bucket)
- `src/components/LeadInquiryForm.tsx` – reusable lead/inquiry form (contact, custom_furniture, chiitra, general)
- `src/pages/CustomFurniture.tsx` – /custom-furniture product page
- `src/pages/Chiitra.tsx` – /chiitra product page
- `supabase/migrations/002_inquiries.sql` – inquiries table
- `docs/DELIVERABLES.md` – this file

### Changed
- `src/lib/supabase.ts` – lazy init, `getSupabaseClient()`, no createClient at module load
- `src/lib/api/leads.ts` – uses `getSupabaseClient()`
- `src/lib/api/blog.ts` – uses `getSupabaseClient()`
- `src/lib/api/orders.ts` – uses `getSupabaseClient()`
- `src/types/supabase.ts` – added `inquiries` table types, `Inquiry`, `InquiryInsert`
- `src/config/seo.ts` – title/description updates, routes for /custom-furniture, /chiitra
- `src/App.tsx` – routes for /custom-furniture, /chiitra
- `src/components/Navigation.tsx` – Custom Furniture, CHIITRA, Get Free Consultation, Design Your Cabinet; visibility (nav bg when home + scroll)
- `src/components/Footer.tsx` – links for Custom Furniture, CHIITRA
- `src/pages/Contact.tsx` – uses `LeadInquiryForm` (variant contact)
- `src/pages/Home.tsx` – hero CTAs (Get Free Consultation, Explore Custom Products); CHIITRA section; custom furniture links to /custom-furniture
- `index.html` – title “Timeless Spaces, Bespoke Furniture & Art”; favicon / favicon.png / apple-touch-icon links
- `public/manifest.json` – description updated
- `docs/RUN_THIS_IN_SUPABASE.sql` – added `inquiries` table and RLS
- `docs/SUPABASE_SETUP.md` – Verify includes inquiries; Storage mentions inquiry-refs

---

## 2. Root cause of the Supabase crash

**Cause:** Supabase was initialised at **module load** in `src/lib/supabase.ts` with `createClient(supabaseUrl, supabaseAnonKey)`. When `VITE_SUPABASE_URL` (or `VITE_SUPABASE_ANON_KEY`) is missing in the build (e.g. production env not set), `supabaseUrl` is `""`. The Supabase client throws **“supabaseUrl is required”** as soon as the module is imported, before any component runs. Any route that eventually imports a module that imports `@/lib/supabase` (e.g. Contact → leads API, Blog → blog API) triggers this on load and the app blanks.

**Fix:** Removed module-level `createClient`. Introduced:
- **Lazy singleton:** `getSupabaseClient()` creates the client only on first use and only when both env vars are non-empty.
- **Safe env read:** `getEnv()` trims and checks type; `isSupabaseConfigured` is derived without creating a client.
- All API modules (leads, blog, orders, inquiries) call `getSupabaseClient()` and handle `null`; no code path calls `createClient` when env is missing, so no throw and no blank screen.

---

## 3. Env vars required in production

Set these in the **production** environment (e.g. Vercel/Netlify/build server):

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL, e.g. `https://zudwmgyibdkmnsnuvehv.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase **anon** (public) key. Never use the service role key in frontend. |
| `VITE_SITE_URL` | Optional | Canonical site URL, e.g. `https://cornelianinteriors.com`. Defaults to origin. |

Use **anon key only** in the frontend. The **service role key** must never be in the client, in Vite env, or in any public file.

---

## 4. SQL / Supabase schema and storage

- **Run once:** `docs/RUN_THIS_IN_SUPABASE.sql` in Supabase → SQL Editor. It creates:
  - `leads`, `custom_orders`, `blog_posts`, **`inquiries`**
  - Indexes and RLS policies (anon insert for leads, custom_orders, inquiries; anon read for published blog_posts only).

- **Storage buckets (create in Dashboard → Storage):**
  - **`custom-orders`** (public) – custom order reference images.
  - **`inquiry-refs`** (public) – inquiry form reference images (custom-furniture, CHIITRA, lead form).  
  For both, add a policy so **anon** can **INSERT** and **SELECT**.

---

## 5. Manual asset replacement (if needed)

- **favicon.ico** – already referenced in `index.html` and manifest. Replace `public/favicon.ico` with Cornelian branding if desired.
- **favicon.png** – referenced in `index.html`; add `public/favicon.png` if you use a PNG favicon.
- **apple-touch-icon.png** – referenced in `index.html`; add `public/apple-touch-icon.png` for iOS.
- **og-image.jpg** – used for social previews; add at `public/og-image.jpg` or update `SEO_DEFAULTS.ogImage` in `src/config/seo.ts`.

---

## 6. Testing checklist

- **/contact** – Page loads (no blank screen). Submit form: with Supabase configured, success toast and form reset; with Supabase missing, friendly message and no crash.
- **/blog** – Page loads. With Supabase: list loads or “No posts yet”; with Supabase missing: empty list, no crash.
- **/custom-furniture** – Page loads. “How it works” and inquiry form visible. Submit inquiry: with Supabase + `inquiries` table, success; optional image upload uses `inquiry-refs` bucket.
- **/chiitra** – Page loads. “How it works” and inquiry form (artwork size, frame, reference images) visible. Submit works when Supabase and `inquiries` are configured.
- **Homepage** – Hero shows “Get Free Consultation” and “Explore Custom Products”. Custom Furniture block and CHIITRA block visible; links to /custom-furniture and /chiitra. No blank screen.
- **Navbar (desktop)** – All links visible (Home, Projects, Services, Blog, About, Contact, Custom Furniture, CHIITRA). “Get Free Consultation” and “Design Your Cabinet” visible. On home with hero, nav has contrast (e.g. light text / dark overlay); on scroll or other pages, nav has solid background and dark text.
- **Navbar (mobile)** – Menu opens; all links and both CTAs work; no overflow or layout issues.
