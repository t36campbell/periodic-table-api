import { PrismaClient } from '@prisma/client';

import { GROUPS } from './groups';
import { PERIODIC_TABLE, TableElement } from './periodic-table';
import { PERIODS } from './periods';
import { PHASES } from './phases';
import { PHASE_TYPES } from './phases-types';
import { SERIES } from './series';
import { SVG_PATHS } from './svg-paths';
import { selectId } from 'src/prisma/prisma.model';

const prisma = new PrismaClient();

async function main() {
  await createElementGroups();
  await createElementPeriods();
  await createElementSeries();
  await createElementPhaseTypes();
  await createElementPhases();
  await createElements();
}

async function createElements(): Promise<void> {
  await prisma.element.createMany({
    data: PERIODIC_TABLE.map((e) => ({
      name: e.name,
      symbol: e.symbol,
      svgPath: SVG_PATHS[e.symbol],
      group: {
        connect: { id: findForeignKey('elementGroup', { id: e.group }) }
      },
      period: {
        connect: { id: findForeignKey('elementPeriod', { id: e.period }) }
      },
      series: {
        connect: { id: findForeignKey('elementSeries', { id: e.series }) }
      },
      particles: {
        connect: { id: createAtomicParticle(e) }
      },
      shell: createElectronShell(e),
      propertiesId: createElementProperties(e),
      detailsId: createElementDetails(e)
    })),
  });
}

async function createElementGroups(): Promise<void> {
  await prisma.elementGroup.createMany({
    data: GROUPS.map((name) => ({ name })),
  });
}

async function createElementPeriods(): Promise<void> {
  await prisma.elementPeriod.createMany({
    data: PERIODS.map((name) => ({ name })),
  });
}

async function createElementSeries(): Promise<void> {
  await prisma.elementType.createMany({
    data: SERIES.map((name) => ({ name })),
  });
}


async function createAtomicParticle(e: TableElement): Promise<number> {
  const { neutrons, protons, electrons } = e
  return await prisma.atomicParticles.create({
    data: {
      neutrons,
      protons,
      electrons,
    },
    select: selectId

  });
}

async function createElectronShell(e: TableElement): Promise<number> {
  const { shells, valence, electrons } = e
  return await prisma.electronShell.create({
    data: {
      shells,
      valence,
      electrons,
    },
    select: selectId

  });
}

async function createElementProperties(e: TableElement): Promise<number> {
  return await prisma.elementProperties.create({
    data: {
      atomicMass: e.atomicMass,
      atomicRadius: e.atomicRadius,
      electronegativity: e.electronegativity,
      firstIonization: e.firstIonization,
      meltingPoint: e.meltingPoint,
      boilingPoint: e.boilingPoint,
      isotopes: e.isotopes,
      specificHeat: e.specificHeat,
      density: e.density,
    },
    select: selectId

  });
}

async function createElementDetails(e: TableElement): Promise<number> {
  return await prisma.elementDetails.create({
    data: {
      radioactive: e.radioactive,
      natural: e.natural,
      metal: e.metal,
      nonmetal: e.nonmetal,
      metalloid: e.metalloid,
      discovered: e.discovered,
      discovererId: createElementDiscoverer(e.discoverer),
    },
    select: selectId

  });
}

async function createElementDiscoverer(discoverer: string): Promise<void> {
  const [firstName, lastName] = discoverer.split(' ')
  await prisma.elementDiscoverer.create({
    data: {
      firstName,
      lastName,
    },
    select: selectId
  });
}


async function createElementPhases(): Promise<void> {
  await prisma.elementPhase.createMany({
    data: PHASES.map((t) => ({
      typeId: t.typeId,
      temperatureMin: t.temperatureMin,
      temperatureMax: t.temperatureMax,
    })),
  });
}

async function createElementPhaseTypes(): Promise<void> {
  await prisma.elementPhaseType.createMany({
    data: PHASE_TYPES.map((name) => ({ name })),
  });
}

async function findForeignKey(table: string, where: any ): Promise<number> {
  // need to make this work dynamically
  // const t = prisma[`${table}`] this is trash
  
  const t = Object.getOwnPropertyNames(prisma).find((names)=> {})
  return await t.findUnique({ where }, { select: selectId })
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
