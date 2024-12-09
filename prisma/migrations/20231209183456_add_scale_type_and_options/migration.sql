-- AlterTable
ALTER TABLE "Question" ADD COLUMN "scaleType" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN "scaleOptions" TEXT[] DEFAULT ARRAY[]::TEXT[];
