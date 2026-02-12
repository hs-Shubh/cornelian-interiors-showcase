# Supabase setup for Cornelian Interiors

## 1. Run the database migration

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and select your project (`zudwmgyibdkmnsnuvehv`).
2. Go to **SQL Editor** → **New query**.
3. Copy the entire contents of **`docs/RUN_THIS_IN_SUPABASE.sql`** and paste into the editor.
4. Click **Run** (or press Cmd/Ctrl + Enter).
5. You should see “Success. No rows returned.” Tables `leads`, `custom_orders`, and `blog_posts` are now created with indexes and RLS policies.

## 2. Create Storage bucket for custom order images

1. In the same project, go to **Storage** in the left sidebar.
2. Click **New bucket**.
3. Name: **`custom-orders`** (must be exactly this).
4. Enable **Public bucket** (so the app can show uploaded image URLs).
5. Click **Create bucket**.
6. (Optional) In **Policies** for this bucket, add a policy that allows `anon` to **INSERT** and **SELECT** so the frontend can upload and read. If the bucket is public, you may only need to allow uploads: “Allow anon uploads” with prefix `*` or per-folder.

## 3. Verify

- **Table Editor**: You should see `leads`, `custom_orders`, `blog_posts`.
- **Authentication → Policies** (or Table Editor → each table → RLS): Policies above should be listed.
- **Storage**: Bucket `custom-orders` exists and is public.

Your `.env` already points to this project; after running the SQL and creating the bucket, contact form, custom orders, and blog will use Supabase.
