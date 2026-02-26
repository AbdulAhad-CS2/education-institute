-- Run this AFTER signing up with email: admin@admin.com
-- This script promotes that specific user to the 'admin' role.

UPDATE profiles
SET role = 'admin', first_name = 'Test', last_name = 'Admin'
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'admin@admin.com'
);

-- Verify the update
SELECT * FROM profiles WHERE role = 'admin';
