/*
  Warnings:

  - You are about to drop the column `multiplicator` on the `Bet` table. All the data in the column will be lost.
  - Changed the type of `matchId` on the `Bet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "multiplicator",
DROP COLUMN "matchId",
ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bet_matchId_key" ON "Bet"("matchId");
