-- Adds user_id column to care_subscribers so each subscription links to an auth.users row.
-- Run this in the Supabase SQL editor after deploying the auth integration.

alter table public.care_subscribers
  add column if not exists user_id uuid references auth.users(id);

create index if not exists care_subscribers_user_id_idx
  on public.care_subscribers(user_id);

-- Row-level security: subscribers can read their own row
alter table public.care_subscribers enable row level security;

create policy "Users can view their own subscription"
  on public.care_subscribers
  for select
  using (auth.uid() = user_id);
