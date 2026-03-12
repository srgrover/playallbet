/*
  Warnings:

  - You are about to drop the column `awayTeamId` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `localTeamId` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentId` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `abbName` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `countryName` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matchId,userId]` on the table `Bet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bet_matchId_key";

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "awayTeamId",
DROP COLUMN "localTeamId",
DROP COLUMN "tournamentId",
DROP COLUMN "winner";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "abbName",
DROP COLUMN "country",
DROP COLUMN "countryName",
DROP COLUMN "fullName",
DROP COLUMN "imageUrl",
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "nameCode" TEXT,
ADD COLUMN     "national" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shortName" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "sportId" INTEGER,
ADD COLUMN     "teamColorsId" INTEGER,
ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "alpha2" TEXT,
    "alpha3" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "slug" TEXT,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamColors" (
    "id" INTEGER NOT NULL,
    "primary" TEXT,
    "secondary" TEXT,
    "text" TEXT,

    CONSTRAINT "TeamColors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL,
    "abbName" TEXT,
    "fullName" TEXT,
    "country" TEXT,
    "countryName" TEXT,
    "imageUrl" TEXT,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "tournamentId" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bet_matchId_userId_key" ON "Bet"("matchId", "userId");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamColorsId_fkey" FOREIGN KEY ("teamColorsId") REFERENCES "TeamColors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
