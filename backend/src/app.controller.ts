import { Controller, Get, Post, Body } from '@nestjs/common';
import { Element } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('element')
  async createUser(@Body() data: Element): Promise<Element> {
    return this.appService.createElement(data);
  }
}
