import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findUser(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
