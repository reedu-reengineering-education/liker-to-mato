/*
  Warnings:

  - Added the required column `value` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "value" INTEGER NOT NULL;
