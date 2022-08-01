/*
  Warnings:

  - You are about to alter the column `svgPath` on the `Element` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10485760)`.

*/
-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "svgPath" SET DATA TYPE VARCHAR(10485760);
