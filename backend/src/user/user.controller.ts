import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Role } from 'src/auth/auth.model';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/core/jwt-auth.guard';
import { Public } from 'src/core/public.decorator';
import { Roles } from 'src/core/role.decorator';
import { RoleGuard } from 'src/core/role.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @Public()
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  @Roles(Role.USER)
  async updateUser(
    @Param('id') id: string,
    @Body() data: User,
    @Headers() headers,
  ): Promise<User> {
    const token = headers.authorization.replace('Bearer ', '');
    const user = this.jwtService.decode(token) as User;
    if (user.id === +id) {
      return this.userService.updateUser(+id, data);
    }
  }
}
