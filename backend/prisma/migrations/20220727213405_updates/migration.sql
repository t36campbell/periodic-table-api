-- DropIndex
DROP INDEX "Element_svgPath_key";

-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "svgPath" SET DATA TYPE TEXT;
