/*
  Warnings:

  - You are about to drop the column `element` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureMax` on the `ElementPhase` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureMin` on the `ElementPhase` table. All the data in the column will be lost.
  - You are about to drop the `ElementType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Element` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `Element` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[svgPath]` on the table `Element` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "element",
DROP COLUMN "typeId",
ADD COLUMN     "detailsId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "particlesId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "propertiesId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "seriesId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shellId" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "symbol" DROP NOT NULL,
ALTER COLUMN "groupId" SET DEFAULT 0,
ALTER COLUMN "periodId" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ElementPhase" DROP COLUMN "temperatureMax",
DROP COLUMN "temperatureMin",
ADD COLUMN     "temperatureRange" INTEGER[];

-- DropTable
DROP TABLE "ElementType";

-- CreateTable
CREATE TABLE "ElementSeries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElementSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ElementSeries_name_key" ON "ElementSeries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Element_name_key" ON "Element"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Element_symbol_key" ON "Element"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Element_svgPath_key" ON "Element"("svgPath");

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ElementGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "ElementPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "ElementSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_particlesId_fkey" FOREIGN KEY ("particlesId") REFERENCES "AtomicParticles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_shellId_fkey" FOREIGN KEY ("shellId") REFERENCES "ElectronShell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "ElementProperties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "ElementDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementDetails" ADD CONSTRAINT "ElementDetails_discovererId_fkey" FOREIGN KEY ("discovererId") REFERENCES "ElementDiscoverer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementPhase" ADD CONSTRAINT "ElementPhase_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ElementPhaseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
