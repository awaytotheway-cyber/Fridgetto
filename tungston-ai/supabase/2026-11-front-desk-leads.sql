-- Front-desk leads: extends protomation_enquiries for the new "Book a free call" form.
-- Run once in the SQL editor of the Protomation Supabase project, AFTER
-- protomation_enquiries.sql. Re-running it is safe: every statement is idempotent.
--
-- Old rows keep their values. RLS is unchanged: the publishable/anon key can insert
-- and nothing else, so leads are readable only with the service role (the dashboard).

alter table public.protomation_enquiries
  add column if not exists business_type text,      -- ivf | derm-hair | dental | diagnostics | education | other
  add column if not exists city text,
  add column if not exists monthly_enquiries text,  -- under-100 | 100-300 | 300-1000 | over-1000 | not-sure
  add column if not exists consent boolean not null default false,
  add column if not exists consent_at timestamptz,
  add column if not exists consent_text text,       -- the exact sentence the person agreed to
  add column if not exists source_path text,        -- the page the form was sent from
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text;

-- The new form has no "service" field
alter table public.protomation_enquiries alter column service drop not null;

-- A front-desk lead is never stored without recorded consent
alter table public.protomation_enquiries drop constraint if exists front_desk_leads_need_consent;
alter table public.protomation_enquiries
  add constraint front_desk_leads_need_consent
  check (form_type <> 'front_desk_enquiry' or (consent and consent_at is not null));

-- For the dashboard: newest front-desk leads first
create index if not exists protomation_enquiries_form_type_created_idx
  on public.protomation_enquiries (form_type, created_at desc);
