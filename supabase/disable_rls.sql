-- Temporarily disable RLS on courses, teachers, and batches tables
-- This is a temporary fix while using custom auth
-- RLS will be re-enabled when migrating back to Supabase Auth

-- Disable RLS on courses
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;

-- Disable RLS on teachers
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;

-- Disable RLS on batches
ALTER TABLE batches DISABLE ROW LEVEL SECURITY;

-- Disable RLS on plan_groups
ALTER TABLE plan_groups DISABLE ROW LEVEL SECURITY;

-- Disable RLS on plans
ALTER TABLE plans DISABLE ROW LEVEL SECURITY;
