/*
  Warnings:

  - You are about to drop the column `discovererId` on the `ElementDetails` table. All the data in the column will be lost.
  - You are about to drop the `ElementDiscoverer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ElementDetails" DROP CONSTRAINT "ElementDetails_discovererId_fkey";

-- AlterTable
ALTER TABLE "ElementDetails" DROP COLUMN "discovererId",
ADD COLUMN     "discoverer" TEXT;

-- DropTable
DROP TABLE "ElementDiscoverer";
