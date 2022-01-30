import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Element } from '@prisma/client';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) {}

  async createElement(data: Element): Promise<Element> {
    return this.prisma.element.create({data})
  }

}
