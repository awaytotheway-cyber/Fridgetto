-- Care Plan subscribers. Written only by the Razorpay/Stripe webhooks, with the
-- service role key (src/lib/care-plan-server.ts -> upsertSubscriber).
--
-- Run this in the SQL editor of the Protomation Supabase project (the same project
-- that handles user auth — user_id references auth.users, so it has to be that one).
-- Re-running it is safe: every statement is idempotent, and it also upgrades a table
-- created before user_id existed.
--
-- RLS is on. The only policy lets a signed-in subscriber read their own row; the
-- publishable/anon key can neither read nor write the table.

create table if not exists public.care_subscribers (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('razorpay', 'stripe')),
  provider_ref text not null,
  billing text check (billing in ('monthly', 'yearly')),
  name text,
  email text,
  phone text,
  business_name text,
  user_id uuid references auth.users(id),
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_ref)
);

-- For a table created before the auth integration landed.
alter table public.care_subscribers
  add column if not exists user_id uuid references auth.users(id);

create index if not exists care_subscribers_user_id_idx
  on public.care_subscribers (user_id);

alter table public.care_subscribers enable row level security;

drop policy if exists "Users can view their own subscription" on public.care_subscribers;
create policy "Users can view their own subscription"
  on public.care_subscribers
  for select
  to authenticated
  using (auth.uid() = user_id);
