import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Role } from 'src/auth/auth.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/core/public.decorator';
import { Roles } from 'src/core/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserService } from './user.service';
import { UpdateUserGuard } from 'src/auth/guards/update-user.guard';

@Controller('user')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Public()
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @UseGuards(UpdateUserGuard)
  async updateUser(@Param('id') id: string, @Body() data: User): Promise<User> {
    return this.userService.updateUser(+id, data);
  }
}
