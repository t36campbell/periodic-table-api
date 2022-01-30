import { PrismaClient } from '@prisma/client';

import { PERIODIC_TABLE } from './periodic-table';

const prisma = new PrismaClient();

async function main() {
  await prisma.element.createMany({ data: PERIODIC_TABLE });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
