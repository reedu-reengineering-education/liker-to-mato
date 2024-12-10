-- Update existing users to RESEARCHER role
UPDATE "User" SET role = 'RESEARCHER' WHERE role != 'RESEARCHER';

-- Modify the default value for new users
ALTER TABLE "User" ALTER COLUMN role SET DEFAULT 'RESEARCHER';
