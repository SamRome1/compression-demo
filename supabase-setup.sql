-- Storage policies for the demo-images bucket
-- Run this in your Supabase SQL Editor after creating the bucket

-- Policy 1: Allow public uploads
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'demo-images');

-- Policy 2: Allow public access
CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'demo-images');
