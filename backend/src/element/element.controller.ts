import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { Element } from '@prisma/client';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  async createElement(@Body() data: Element): Promise<Element> {
    return this.elementService.createElement(data);
  }

  @Get(':id')
  async getElement(@Param('id') id: string): Promise<Element> {
    return this.elementService.getElement(+id);
  }

  @Patch(':id')
  async updateElement(
    @Param('id') id: string,
    @Body() data: Element,
  ): Promise<Element> {
    return this.elementService.updateElement(+id, data);
  }

  @Delete(':id')
  async deleteElement(@Param('id') id: string): Promise<Element> {
    return this.elementService.deleteElement(+id);
  }
}
