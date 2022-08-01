/*
  Warnings:

  - You are about to drop the column `atomicMass` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `atomicNumber` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `atomicRadius` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `boilingPoint` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `density` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `discovered` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `discoverer` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `electronegativity` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `electrons` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `firstIonization` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `isotopes` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `meltingPoint` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `metal` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `metalloid` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `natural` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `neutrons` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `nonmetal` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `phase` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `protons` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `radioactive` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `shells` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `specificHeat` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `valence` on the `Element` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Element` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodId` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "atomicMass",
DROP COLUMN "atomicNumber",
DROP COLUMN "atomicRadius",
DROP COLUMN "boilingPoint",
DROP COLUMN "density",
DROP COLUMN "discovered",
DROP COLUMN "discoverer",
DROP COLUMN "electronegativity",
DROP COLUMN "electrons",
DROP COLUMN "firstIonization",
DROP COLUMN "group",
DROP COLUMN "isotopes",
DROP COLUMN "meltingPoint",
DROP COLUMN "metal",
DROP COLUMN "metalloid",
DROP COLUMN "natural",
DROP COLUMN "neutrons",
DROP COLUMN "nonmetal",
DROP COLUMN "period",
DROP COLUMN "phase",
DROP COLUMN "protons",
DROP COLUMN "radioactive",
DROP COLUMN "shells",
DROP COLUMN "specificHeat",
DROP COLUMN "type",
DROP COLUMN "valence",
ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "periodId" INTEGER NOT NULL,
ADD COLUMN     "svgPath" TEXT,
ADD COLUMN     "typeId" INTEGER;

-- CreateTable
CREATE TABLE "AtomicParticles" (
    "id" SERIAL NOT NULL,
    "neutrons" INTEGER NOT NULL,
    "protons" INTEGER NOT NULL,
    "electrons" INTEGER NOT NULL,

    CONSTRAINT "AtomicParticles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectronShell" (
    "id" SERIAL NOT NULL,
    "shells" INTEGER NOT NULL,
    "valence" INTEGER NOT NULL,
    "electrons" INTEGER NOT NULL,

    CONSTRAINT "ElectronShell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementProperties" (
    "id" SERIAL NOT NULL,
    "atomicMass" DOUBLE PRECISION NOT NULL,
    "atomicRadius" DOUBLE PRECISION NOT NULL,
    "electronegativity" DOUBLE PRECISION NOT NULL,
    "firstIonization" DOUBLE PRECISION NOT NULL,
    "meltingPoint" DOUBLE PRECISION NOT NULL,
    "boilingPoint" DOUBLE PRECISION NOT NULL,
    "isotopes" DOUBLE PRECISION NOT NULL,
    "specificHeat" DOUBLE PRECISION NOT NULL,
    "density" TEXT NOT NULL,

    CONSTRAINT "ElementProperties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementDetails" (
    "id" SERIAL NOT NULL,
    "radioactive" BOOLEAN NOT NULL,
    "natural" BOOLEAN NOT NULL,
    "metal" BOOLEAN NOT NULL,
    "nonmetal" BOOLEAN NOT NULL,
    "metalloid" BOOLEAN NOT NULL,
    "discovererId" INTEGER,
    "discovered" DATE,

    CONSTRAINT "ElementDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementDiscoverer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "ElementDiscoverer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElementGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementPeriod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElementPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementPhase" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "temperatureMin" DOUBLE PRECISION NOT NULL,
    "temperatureMax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ElementPhase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementPhaseType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElementPhaseType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ElementGroup_name_key" ON "ElementGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ElementPeriod_name_key" ON "ElementPeriod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ElementType_name_key" ON "ElementType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ElementPhaseType_name_key" ON "ElementPhaseType"("name");
