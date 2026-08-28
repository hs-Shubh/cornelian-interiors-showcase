-- Notifies the n8n "Lead Notify" workflow whenever a new lead/inquiry is saved.
-- Run in Supabase SQL Editor AFTER 004 and after the n8n webhook exists.
-- Uses pg_net (bundled with Supabase) to POST the new row to n8n.

create extension if not exists pg_net;

create or replace function public.notify_n8n_lead()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://n8n-production-a591.up.railway.app/webhook/lead-notify',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := to_jsonb(NEW)
  );
  return NEW;
end;
$$;

drop trigger if exists trg_notify_lead on public.leads;
create trigger trg_notify_lead
  after insert on public.leads
  for each row execute function public.notify_n8n_lead();

drop trigger if exists trg_notify_inquiry on public.inquiries;
create trigger trg_notify_inquiry
  after insert on public.inquiries
  for each row execute function public.notify_n8n_lead();
