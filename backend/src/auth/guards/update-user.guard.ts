import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  constructor(
    private coreService: CoreService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // will this work
    const request = await this.coreService.getRequest(context);
    const user = await this.userService.decodeUser(request);
    const validatedUser = await this.userService.validateUserById(user.id);
    return !!validatedUser;
  }
}
