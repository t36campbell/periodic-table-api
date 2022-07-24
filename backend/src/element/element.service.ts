import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Element } from '@prisma/client';

@Injectable()
export class ElementService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createElement(data: Element): Promise<Element> {
    return this.prisma.element.create({ data });
  }

  async getElement(id: number): Promise<Element> {
    return this.prisma.element.findUnique({ where: { id } });
  }
  
  async listElements(): Promise<Element> {
    return this.prisma.element.findMany();
  }
  
  async searchElements(term: string): Promise<Element> {
    return this.prisma.element.findMany({ 
      take: 5,
      orderBy: {
        _relevance: {
          fields: ['name', 'symbol'],
          search: term,
        },
      },
      select: {
        id: true,
        name: true
      }
    });
  }

  async updateElement(id: number, data: Element): Promise<Element> {
    return this.prisma.element.update({ 
      where: { id }, 
      data 
    });
  }

  async deleteElement(id: number): Promise<Element> {
    return this.prisma.element.delete({ where: { id } });
  }
}
