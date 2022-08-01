import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { LoginRequest, Token } from './auth.model';
import { AuthService } from './auth.service';
import { ActiveUserGuard } from './guards/active-user.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(ActiveUserGuard)
  async login(@Body() data: LoginRequest): Promise<Token> {
    return this.authService.login(data.email);
  }
}
