# Cornelian — Backend & Automation Setup

Everything the site needs on the server side. Frontend is already wired; these
steps make forms, notifications and the AI Design Studio go live.

> Security: keep the **service_role** key and **Gemini** key ONLY here / in n8n.
> Never put them in the frontend or the repo. Rotate the keys shared in chat.

## 1. Supabase (project `zudwmgyibdkmnsnuvehv`)
1. In **SQL Editor**, run `supabase/migrations/004_rls_design_storage.sql`.
   This adds the anon INSERT policies (forms were blocked by RLS), the storage
   buckets `inquiry-refs` + `design-previews`, and the `design_requests` table.
   (Tables `leads`, `inquiries`, `custom_orders`, `projects` already exist.)
2. `.env` already has the URL + anon key → forms now save to Supabase and the
   button reads "Send Message" instead of "Send via Email".
3. Verify: submit any form → row appears in the table.

## 2. Lead → Email + Google Sheet + WhatsApp (n8n)
**Trigger:** Supabase → Database → **Webhooks** → new webhook on `INSERT` for
`leads` and `inquiries` → POST to the n8n **Webhook** node URL.

**n8n workflow (import via UI or REST API):**
1. **Webhook** (POST) — receives the new row.
2. **Set/Function** — format a message: name, email, phone, message, source,
   page, reference image URLs.
3. **Gmail** node → send to `cornelianexecutiveinteriors@gmail.com`
   (subject: "New Cornelian lead — {{source}}"). Needs Google OAuth.
4. **Google Sheets** → *Append Row* to your leads sheet. Needs Google OAuth +
   the Sheet ID.
5. **WhatsApp Business Cloud** node → send to your business number.
   Meta Cloud API needs: Phone Number ID, permanent access token, and an
   approved message template (business-initiated messages require a template).

**Still needed from you:** Google account OAuth (Gmail + Sheets) + the Sheet ID,
and Meta WhatsApp Cloud API creds (Phone Number ID, token, template name).

## 3. AI Design Studio (n8n + Gemini)
**Frontend:** `/design-studio` posts the form to `VITE_N8N_DESIGN_WEBHOOK_URL`.
Set that env var to the n8n webhook once built. (If unset, requests are saved to
`design_requests` in Supabase as a fallback — no images generated.)

**n8n workflow:**
1. **Webhook** (POST) — receives `{ room_type, length_ft, width_ft, height_ft,
   styles[], palette, budget, name, email, phone, whatsapp }`.
2. **Gemini (text)** — build a rich interior prompt from the inputs.
3. **Gemini (image)** — generate 1–3 concepts (model: `gemini-2.5-flash-image`
   / Imagen). Use a **standard API key** (format `AIza…` from
   aistudio.google.com/apikey — the `AQ.Ab8…` value looks like a short-lived
   OAuth token and likely won't work as a static key).
4. **Supabase (Storage)** — upload images to bucket `design-previews`; collect
   public URLs.
5. **Supabase (DB)** — insert into `design_requests` (inputs + image_urls).
6. **WhatsApp** — notify you of a new AI lead.
7. **Respond to Webhook** — return `{ "image_urls": ["…"] }` so the site shows
   the concepts.

**Guardrails:** add a rate-limit (per IP/session) before the Gemini calls to
protect the free quota; return a graceful error on failure.

## 4. Credentials checklist (pending)
- [ ] Meta WhatsApp Cloud API: Phone Number ID, access token, template name.
- [ ] Google OAuth (Gmail + Sheets) + Sheet ID.
- [ ] Valid Gemini API key (`AIza…`).
- [ ] Set `VITE_N8N_DESIGN_WEBHOOK_URL` in production env once the workflow exists.
- [ ] Rotate the service_role / n8n / Gemini keys shared during setup.
