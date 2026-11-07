-- Contact form and quote-request submissions from the Protomation.ai website.
-- Written by src/lib/enquiry-store.ts with the project's publishable/anon key.
--
-- Run this once in the SQL editor of the Protomation Supabase project (the same
-- project that handles user auth). Re-running it is safe.
--
-- RLS is on and the only policy is INSERT, so the publishable key can add an enquiry
-- but cannot read one back, change it or delete it. Reading needs the service role,
-- which in practice means the Supabase dashboard. Keep it that way: adding a SELECT
-- policy for anon would publish every enquirer's contact details.

create table if not exists public.protomation_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  business_name text,
  service text not null,
  task text,
  source text not null default 'website',
  form_type text not null default 'consultation_enquiry'
);

comment on table public.protomation_enquiries is
  'Contact form submissions from the Protomation.ai website. Written by the site with the publishable key (insert only); readable only with the service role, i.e. the Supabase dashboard.';

create index if not exists protomation_enquiries_created_at_idx
  on public.protomation_enquiries (created_at desc);

alter table public.protomation_enquiries enable row level security;

-- Insert only, and nothing else. Granted to authenticated as well as anon so a
-- submission still lands if the form is ever sent with a signed-in user's session.
drop policy if exists "website may submit enquiries" on public.protomation_enquiries;
create policy "website may submit enquiries"
  on public.protomation_enquiries
  for insert
  to anon, authenticated
  with check (true);
