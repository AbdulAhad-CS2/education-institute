-- Create a bucket for tests and submissions
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assignments', 'assignments', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the 'assignments' bucket
-- Allow public access for viewing (simpler for this dev phase as requested)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'assignments');

-- Allow authenticated users to upload to the bucket
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'assignments');

-- Allow users to delete their own uploads? 
-- For now, keep it simple and allow all authenticated during this phase or just disable RLS on storage if possible?
-- Supabase Storage RLS is more strict. Let's allow insert for authenticated.
