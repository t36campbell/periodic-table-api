import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Element } from '@prisma/client';

@Injectable()
export class ElementService {
  constructor(private prisma: PrismaService) {}

  // async getElements(): Promise<Element> {
  //     return this.prisma.element.findMany()
  // }

  async createElement(data: Element): Promise<Element> {
    return this.prisma.element.create({ data });
  }

  async getElement(id: number): Promise<Element> {
    return this.prisma.element.findUnique({ where: { id } });
  }

  async updateElement(id: number, data: Element): Promise<Element> {
    return this.prisma.element.update({ where: { id }, data });
  }

  async deleteElement(id: number): Promise<Element> {
    return this.prisma.element.delete({ where: { id } });
  }
}
