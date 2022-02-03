import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { Token } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<User> {
    return this.userService.findUser(email);
  }

  async login(email: string): Promise<Token> {
    const user = await this.userService.findUser(email);
    return { token: this.jwtService.sign(user) };
  }
}
