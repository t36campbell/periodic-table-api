import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { UserService } from 'src/user/user.service';
import { LoginRequest } from '../auth.model';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private coreService: CoreService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await this.coreService.getRequest<LoginRequest>(context);
    const user = await this.userService.validateUserByEmail(request.body.email);
    return !!user;
  }
}
