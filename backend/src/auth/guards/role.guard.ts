import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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
    const requiredRoles = await this.userService.checkRequirements<Role[]>(context, ROLES_KEY)
    // this needs to be checked 
    if (!requiredRoles) {
      // console.log('am i dumb?')
      return true;
    }    
    const request = await this.coreService.getRequest(context)
    const user = await this.userService.decodeUser(request)
    return requiredRoles.every((role) => [user.role].includes(role));
  }
}
