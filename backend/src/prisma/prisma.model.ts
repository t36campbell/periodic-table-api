import { Prisma } from '@prisma/client';

export const selectId = {
  id: true,
};

export interface SearchElement {
  id: number;
  name: string;
}
