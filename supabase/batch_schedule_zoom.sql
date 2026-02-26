-- Add timing, days, and zoom link columns to the batches table
ALTER TABLE public.batches
ADD COLUMN IF NOT EXISTS timings text,
ADD COLUMN IF NOT EXISTS days text,
ADD COLUMN IF NOT EXISTS zoom_link text;

-- Ensure RLS is still disabled for this dev phase if needed, 
-- though it was already done in previous scripts, let's be safe.
ALTER TABLE public.batches DISABLE ROW LEVEL SECURITY;
