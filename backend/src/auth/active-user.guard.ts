import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.authService.validateUser(request.body.email);
    return !!user;
  }
}
