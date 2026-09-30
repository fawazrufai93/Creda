-- Run this once in Supabase: SQL Editor > New query > paste > Run.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  phone text,
  business_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, phone, business_name)
  values (new.id, new.email, new.phone, new.raw_user_meta_data->>'business_name')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- Workspace data (run this section too) ----
alter table public.profiles add column if not exists business jsonb;

create table if not exists public.invoices (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  data jsonb not null,
  created_at timestamptz not null default now()
);
create table if not exists public.transactions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.invoices enable row level security;
alter table public.transactions enable row level security;

create policy "Own invoices" on public.invoices
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own transactions" on public.transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
