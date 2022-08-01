import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { Element } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/role.decorator';
import { Role } from 'src/auth/auth.model';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { SearchElement } from 'src/prisma/prisma.model';

@Controller('element')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ElementController {
  constructor(private elementService: ElementService) {}

  @Post()
  @Roles(Role.ADMIN)
  async createElement(@Body() data: Element): Promise<Element> {
    return this.elementService.createElement(data);
  }

  @Get('elements')
  @Roles(Role.USER)
  async listElements(): Promise<Element[]> {
    return this.elementService.listElements();
  }

  @Post('search')
  @Roles(Role.USER)
  async searchElements(
    @Body() data: { term: string },
  ): Promise<SearchElement[]> {
    return this.elementService.searchElements(data.term);
  }

  @Get(':id')
  @Roles(Role.USER)
  async getElement(@Param('id') id: string): Promise<Element> {
    return this.elementService.getElement(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async updateElement(
    @Param('id') id: string,
    @Body() data: Element,
  ): Promise<Element> {
    return this.elementService.updateElement(+id, data);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteElement(@Param('id') id: string): Promise<Element> {
    return this.elementService.deleteElement(+id);
  }
}
