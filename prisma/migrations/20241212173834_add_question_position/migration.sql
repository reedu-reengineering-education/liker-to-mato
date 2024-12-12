-- AlterTable
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "position" INTEGER NOT NULL DEFAULT 0;

-- Add index on surveyId
CREATE INDEX IF NOT EXISTS "Question_surveyId_idx" ON "Question"("surveyId");

-- UpdateData: Set position based on creation date within each survey
WITH numbered_questions AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY "surveyId" ORDER BY "createdAt") - 1 as new_position
  FROM "Question"
)
UPDATE "Question" q
SET position = nq.new_position
FROM numbered_questions nq
WHERE q.id = nq.id;
