import { PrismaClient } from '@prisma/client';

import { DISCOVERERS } from './discoverers';
import { GROUPS } from './groups';
import { PERIODIC_TABLE } from './periodic-table';
import { PERIODS } from './periods';
import { PHASES } from './phases';
import { PHASE_TYPES } from './phases-types';
import { SERIES } from './series';
import { SVG_PATHS } from './svg-paths';

const prisma = new PrismaClient();

async function main() {
  await createElementGroups();
  await createElementPeriods();
  await createElementSeries();
  await createElements();
  await createAtomicParticles();
  await createElectronShells();
  await createElementProperties();
  await createElementDetails();
  await createElementDiscoverers();
  await createElementPhaseTypes();
  await createElementPhases();
}

async function createElements() {
  await prisma.element.createMany({
    data: PERIODIC_TABLE.map((e) => ({
      element: e.element,
      symbol: e.symbol,
      groupId: e.group,
      periodId: e.period,
      seriesId: SERIES.findIndex((series) => series === e.series),
      svgPath: SVG_PATHS[e.symbol],
    })),
  });
}

async function createAtomicParticles() {
  await prisma.atomicParticles.createMany({
    data: PERIODIC_TABLE.map((e) => ({
      neutrons: e.neutrons,
      protons: e.protons,
      electrons: e.electrons,
    })),
  });
}

async function createElectronShells() {
  await prisma.electronShell.createMany({
    data: PERIODIC_TABLE.map((e) => ({
      shells: e.neutrons,
      valence: e.protons,
      electrons: e.electrons,
    })),
  });
}

async function createElementProperties() {
  await prisma.elementProperties.createMany({
    data: PERIODIC_TABLE.map((e) => ({
      atomicMass: e.atomicMass,
      atomicRadius: e.atomicRadius,
      electronegativity: e.electronegativity,
      firstIonization: e.firstIonization,
      meltingPoint: e.meltingPoint,
      boilingPoint: e.boilingPoint,
      isotopes: e.isotopes,
      specificHeat: e.specificHeat,
      density: e.density,
    })),
  });
}

async function createElementDetails() {
  await prisma.elementDetails.createMany({
    data: PERIODIC_TABLE.map((e) => ({
      radioactive: e.radioactive,
      natural: e.natural,
      metal: e.metal,
      nonmetal: e.nonmetal,
      metalloid: e.metalloid,
    })),
  });
}

async function createElementDiscoverers() {
  await prisma.elementDiscoverer.createMany({
    data: DISCOVERERS.map((d) => ({
      firstName: d.firstName,
      lastName: d.lastName,
    })),
  });
}

async function createElementGroups() {
  await prisma.elementGroup.createMany({
    data: GROUPS.map((group) => ({ name: group })),
  });
}

async function createElementPeriods() {
  await prisma.elementPeriod.createMany({
    data: PERIODS.map((period) => ({ name: period })),
  });
}
// change elementType to elementSeries after prisma generate schema
async function createElementSeries() {
  await prisma.elementType.createMany({
    data: SERIES.map((series) => ({ name: series })),
  });
}

async function createElementPhases() {
  await prisma.elementPhase.createMany({
    data: PHASES.map((t) => ({
      typeId: t.typeId,
      temperatureMin: t.temperatureMin,
      temperatureMax: t.temperatureMax,
    })),
  });
}

async function createElementPhaseTypes() {
  await prisma.elementPhaseType.createMany({
    data: PHASE_TYPES.map((p) => ({
      name: p.name,
    })),
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
