import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Token } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async login(email: string): Promise<Token> {
    const user = await this.userService.findUser(email);
    return this.userService.encodeUser(user)
  }
}
