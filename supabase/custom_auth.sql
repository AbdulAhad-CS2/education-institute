-- Create a custom users table for temporary auth
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null, -- Storing plain text for temporary dev environment as requested
  name text,
  role text check (role in ('admin', 'teacher', 'student')) default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS but allow public access for now (since we handle auth in API actions)
-- OR just disable RLS to avoid headaches for this temporary table
alter table public.users enable row level security;

create policy "Enable read access for all users"
on public.users for select
using (true);

create policy "Enable insert for all users"
on public.users for insert
with check (true);

create policy "Enable update for all users"
on public.users for update
using (true);

create policy "Enable delete for all users"
on public.users for delete
using (true);
