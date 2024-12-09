-- Step 1: Add new columns as nullable
ALTER TABLE "Account" ADD COLUMN "createdAt" TIMESTAMP(3),
                      ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "Answer" ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "Question" ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "Session" ADD COLUMN "createdAt" TIMESTAMP(3),
                      ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "Survey" ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "User" ADD COLUMN "createdAt" TIMESTAMP(3),
                   ADD COLUMN "lastLogin" TIMESTAMP(3),
                   ADD COLUMN "role" TEXT,
                   ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "VerificationToken" ADD COLUMN "createdAt" TIMESTAMP(3);

-- Step 2: Update existing rows
UPDATE "Account" SET "createdAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP WHERE "createdAt" IS NULL;
UPDATE "Answer" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;
UPDATE "Question" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;
UPDATE "Session" SET "createdAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP WHERE "createdAt" IS NULL;
UPDATE "Survey" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;
UPDATE "User" SET "createdAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP, "role" = 'user' WHERE "createdAt" IS NULL;
UPDATE "VerificationToken" SET "createdAt" = CURRENT_TIMESTAMP WHERE "createdAt" IS NULL;

-- Step 3: Make columns non-nullable and set default values
ALTER TABLE "Account" ALTER COLUMN "createdAt" SET NOT NULL,
                      ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
                      ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "Answer" ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "Question" ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "Session" ALTER COLUMN "createdAt" SET NOT NULL,
                      ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
                      ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "Survey" ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL,
                   ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
                   ALTER COLUMN "role" SET NOT NULL,
                   ALTER COLUMN "role" SET DEFAULT 'user',
                   ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "VerificationToken" ALTER COLUMN "createdAt" SET NOT NULL,
                                ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;