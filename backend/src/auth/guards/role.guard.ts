import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { ROLES_KEY } from '../../core/role.decorator';
import { Role } from '../auth.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private coreService: CoreService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = await this.userService.checkRequirements<Role[]>(
      context,
      ROLES_KEY,
    );
    const request = await this.coreService.getRequest(context);
    const user = await this.userService.decodeUser(request);
    return requiredRoles
      ? true
      : requiredRoles.every((role) => [user.role].includes(role));
  }
}
