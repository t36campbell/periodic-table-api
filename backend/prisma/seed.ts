import { PrismaClient } from '@prisma/client';
import { BatchPayload } from 'prisma';

import { GROUPS } from './groups';
import { PERIODIC_TABLE, TableElement } from './periodic-table';
import { PERIODS } from './periods';
import { PHASES } from './phases';
import { PHASE_TYPES } from './phases-types';
import { SERIES } from './series';
import { SVG_PATHS } from './svg-paths';

const prisma = new PrismaClient();

const selectId = {
  id: true,
};

async function main() {
  const groups = await createElementGroups();
  const periods = await createElementPeriods();
  const series = await createElementSeries();
  console.log(groups, periods, series);
  await createElementPhaseTypes();
  await createElementPhases();
  await createElements();
}

async function createElements(): Promise<void> {
  PERIODIC_TABLE.forEach(async (e) => {
    const group = await findElementGroup(e.group);
    const period = await findElementPeriod(e.period);
    const series = await findElementSeries(e.series);
    const ap = await createAtomicParticle(e);
    const shell = await createElectronShell(e);
    const prop = await createElementProperties(e);
    const detail = await createElementDetails(e);
    await prisma.element.create({
      data: {
        name: e.name,
        symbol: e.symbol,
        svgPath: SVG_PATHS[e.symbol],
        group: {
          connect: { id: group.id },
        },
        period: {
          connect: { id: period.id },
        },
        series: {
          connect: { id: series.id },
        },
        particles: {
          connect: { id: ap.id },
        },
        shell: {
          connect: { id: shell.id },
        },
        properties: {
          connect: { id: prop.id },
        },
        details: {
          connect: { id: detail.id },
        },
      },
    });
  });
}

async function createElementGroups(): Promise<BatchPayload> {
  return await prisma.elementGroup.createMany({
    data: GROUPS.map((name) => ({ name })),
  });
}

async function createElementPeriods(): Promise<BatchPayload> {
  return await prisma.elementPeriod.createMany({
    data: PERIODS.map((name) => ({ name })),
  });
}

async function createElementSeries(): Promise<BatchPayload> {
  return await prisma.elementSeries.createMany({
    data: SERIES.map((name) => ({ name })),
  });
}

async function createAtomicParticle(e: TableElement): Promise<Connection> {
  const { neutrons, protons, electrons } = e;
  return await prisma.atomicParticles.create({
    data: {
      neutrons,
      protons,
      electrons,
    },
    select: selectId,
  });
}

async function createElectronShell(e: TableElement): Promise<Connection> {
  const { shells, valence, electrons } = e;
  return await prisma.electronShell.create({
    data: {
      shells,
      valence,
      electrons,
    },
    select: selectId,
  });
}

async function createElementProperties(e: TableElement): Promise<Connection> {
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
    select: selectId,
  });
}

async function createElementDetails(e: TableElement): Promise<Connection> {
  return await prisma.elementDetails.create({
    data: {
      radioactive: e.radioactive,
      natural: e.natural,
      metal: e.metal,
      nonmetal: e.nonmetal,
      metalloid: e.metalloid,
      discovered: new Date(e.discovered),
      discoverer: e.discoverer,
    },
    select: selectId,
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

async function findElementGroup(id: number): Promise<Connection> {
  return await prisma.elementGroup.findUnique({
    where: { id },
    select: selectId,
  });
}

async function findElementPeriod(id: number): Promise<Connection> {
  return await prisma.elementPeriod.findUnique({
    where: { id },
    select: selectId,
  });
}

async function findElementSeries(name: string): Promise<Connection> {
  return await prisma.elementSeries.findFirst({
    where: { name },
    select: selectId,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);

interface Connection {
  id: number;
}
