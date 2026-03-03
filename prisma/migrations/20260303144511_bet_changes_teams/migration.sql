/*
  Warnings:

  - The `winner` column on the `Bet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "winner",
ADD COLUMN     "winner" INTEGER DEFAULT 0;
