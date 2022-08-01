/*
  Warnings:

  - Made the column `symbol` on table `Element` required. This step will fail if there are existing NULL values in that column.
  - Made the column `svgPath` on table `Element` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Element` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "symbol" SET NOT NULL,
ALTER COLUMN "groupId" DROP DEFAULT,
ALTER COLUMN "periodId" DROP DEFAULT,
ALTER COLUMN "svgPath" SET NOT NULL,
ALTER COLUMN "detailsId" DROP DEFAULT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "particlesId" DROP DEFAULT,
ALTER COLUMN "propertiesId" DROP DEFAULT,
ALTER COLUMN "seriesId" DROP DEFAULT,
ALTER COLUMN "shellId" DROP DEFAULT;
