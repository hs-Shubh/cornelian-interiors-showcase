# Supabase leads – verification checklist

## ✅ What’s already configured

### 1. **Leads table** (contact + popup)
- **Website:** Contact page form and “Get a Free Consultation” lead popup.
- **API:** `submitLead()` in `src/lib/api/leads.ts`.
- **Supabase:** Inserts into table **`leads`** with:
  - `name`, `email`, `phone`, `message`, `source`
- **Source values:** `"contact"` (Contact page), `"lead_popup"` (popup).
- **Schema match:** Your `leads` table (id, created_at, name, email, phone, message, source) matches the insert. ✅

### 2. **Custom orders table** (/custom-order)
- **Website:** “Design Your Cabinet” flow at `/custom-order` (product type, dimensions, material, finish, images, contact).
- **API:** `submitCustomOrder()` in `src/lib/api/orders.ts`.
- **Supabase:** Inserts into table **`custom_orders`** with:
  - `order_id`, `product_type`, `width_cm`, `height_cm`, `depth_cm`, `material`, `finish`, `notes`, `image_urls`, `customer_name`, `customer_email`, `customer_phone`, `status`
- **Schema match:** Your `custom_orders` columns match. ✅ (Use `image_urls` as **text[]** in Postgres.)

### 3. **Environment**
- **.env** has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set to your project.
- So the app can talk to Supabase. ✅

---

## ⚠️ Required: RLS policies

For forms to insert from the browser (anonymous users), these policies must exist:

| Table           | Policy name                      | Allowed          |
|----------------|-----------------------------------|------------------|
| `leads`        | Allow anon insert leads           | INSERT for anon  |
| `custom_orders`| Allow anon insert custom_orders   | INSERT for anon  |

**How to check:** Supabase → **Table Editor** → select `leads` or `custom_orders` → **RLS policy** (or **Authentication → Policies**). You should see the policy above for each.

**If missing:** Run the full **`docs/RUN_THIS_IN_SUPABASE.sql`** in the SQL Editor. It creates these policies.

---

## ⚠️ Custom Furniture & CHIITRA forms (inquiries table)

- **Website:** `/custom-furniture` and `/chiitra` use the inquiry form and **`submitInquiry()`**.
- **Supabase:** That API inserts into table **`inquiries`** (not `leads`).

Your schema shows **`leads`**, **`custom_orders`**, and **`blog_posts`** but no **`inquiries`** table. So:

- **Contact form and lead popup** → will save to **`leads`** ✅  
- **Custom order form** (/custom-order) → will save to **`custom_orders`** ✅  
- **Custom Furniture / CHIITRA forms** → will **fail** until **`inquiries`** exists.

**Fix:** In Supabase **SQL Editor**, run the part of **`docs/RUN_THIS_IN_SUPABASE.sql`** that creates **`inquiries`** and its RLS policy (from `CREATE TABLE IF NOT EXISTS public.inquiries` through `CREATE POLICY "Allow anon insert inquiries"`). Or run the whole file; it’s safe to run again.

---

## Quick test

1. Open the site, wait for the lead popup (or go to Contact).
2. Fill name, email, phone, message → Submit.
3. In Supabase → **Table Editor** → **`leads`** → you should see a new row with `source = 'lead_popup'` or `'contact'`.
4. Go to `/custom-order`, complete and submit an order.
5. In **`custom_orders`** you should see a new row.

If 3 or 5 fail, check the browser **Console** (F12) for errors and confirm RLS policies above.
