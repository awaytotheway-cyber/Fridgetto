-- Protomation website tables, for a Supabase project shared with another app (e.g. DOST).
-- Paste all of this into Supabase → SQL Editor → New query, and press Run.
-- Safe to run more than once. Touches no existing table: both new tables start with protomation_.

create table if not exists public.protomation_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  business_name text,
  service text,
  task text,
  source text not null default 'website',
  form_type text not null default 'consultation_enquiry',
  business_type text,
  city text,
  monthly_enquiries text,
  consent boolean not null default false,
  consent_at timestamptz,
  consent_text text,
  source_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  constraint front_desk_leads_need_consent
    check (form_type <> 'front_desk_enquiry' or (consent and consent_at is not null))
);
create index if not exists protomation_enquiries_created_at_idx on public.protomation_enquiries (created_at desc);
alter table public.protomation_enquiries enable row level security;
drop policy if exists "website may submit enquiries" on public.protomation_enquiries;
create policy "website may submit enquiries" on public.protomation_enquiries
  for insert to anon, authenticated with check (true);

create table if not exists public.protomation_site_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (name in (
    'cta_book_call', 'form_submit', 'demo_call_click', 'whatsapp_click', 'calculator_used', 'diagnostic_view'
  )),
  label text check (char_length(label) <= 60),
  path text check (char_length(path) <= 200)
);
create index if not exists protomation_site_events_created_at_idx on public.protomation_site_events (created_at desc);
alter table public.protomation_site_events enable row level security;
drop policy if exists "website may record events" on public.protomation_site_events;
create policy "website may record events" on public.protomation_site_events
  for insert to anon, authenticated with check (true);
