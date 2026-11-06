-- Care Plan subscribers. Written only by the Razorpay/Stripe webhooks using the
-- service role key. RLS is on with NO policies, so the public/publishable key can
-- neither read nor write it. Run once in the Supabase SQL editor.
create table if not exists public.care_subscribers (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('razorpay', 'stripe')),
  provider_ref text not null,
  billing text check (billing in ('monthly', 'yearly')),
  name text,
  email text,
  phone text,
  business_name text,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_ref)
);

alter table public.care_subscribers enable row level security;
