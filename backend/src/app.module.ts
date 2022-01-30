import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ElementService } from './element/element.service';
import { ElementController } from './element/element.controller';

@Module({
  imports: [],
  controllers: [ElementController],
  providers: [PrismaService, ElementService],
})
export class AppModule {}
