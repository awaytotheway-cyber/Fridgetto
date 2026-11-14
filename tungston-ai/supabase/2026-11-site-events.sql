-- First-party event counts from the website (src/lib/analytics.ts → /api/event).
-- Run once in the SQL editor of the Protomation Supabase project. Re-running is safe.
--
-- No cookies and no visitor identifiers: each row is an event name, a short label,
-- the page path and the time. RLS lets the publishable/anon key insert and nothing else.

create table if not exists public.site_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (name in (
    'cta_book_call', 'form_submit', 'demo_call_click', 'whatsapp_click', 'calculator_used', 'diagnostic_view'
  )),
  label text check (char_length(label) <= 60),
  path text check (char_length(path) <= 200)
);

create index if not exists site_events_created_at_idx on public.site_events (created_at desc);

alter table public.site_events enable row level security;

drop policy if exists "website may record events" on public.site_events;
create policy "website may record events"
  on public.site_events
  for insert
  to anon, authenticated
  with check (true);

-- Weekly counts, for the SQL editor:
--   select date_trunc('week', created_at) as week, name, count(*)
--   from public.site_events group by 1, 2 order by 1 desc, 3 desc;
