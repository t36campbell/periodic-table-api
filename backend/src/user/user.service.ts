import { Injectable, ExecutionContext } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { selectId } from '../prisma/prisma.model';
import { HttpRequest } from 'src/core/core.model';
import { Token } from 'src/auth/auth.model';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findUser(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async validateUserByEmail(email: string): Promise<{ id: number }> {
    return this.prisma.user.findUnique({
      where: { email },
      select: selectId,
    });
  }

  async validateUserById(id: number): Promise<{ id: number }> {
    return this.prisma.user.findUnique({
      where: { id },
      select: selectId,
    });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async encodeUser(user: User): Promise<Token> {
    return { token: this.jwtService.sign(user) };
  }

  async decodeUser(request: HttpRequest<any>): Promise<User> {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.jwtService.decode(token) as User;
  }

  async checkRequirements<T>(
    context: ExecutionContext,
    KEY: string,
  ): Promise<T> {
    return this.reflector.getAllAndOverride<T>(KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
