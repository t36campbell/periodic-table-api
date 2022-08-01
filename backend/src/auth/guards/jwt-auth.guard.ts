import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { PUBLIC_KEY } from '../../core/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private userService: UserService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.userService.checkRequirements<boolean>(context, PUBLIC_KEY)
    return isPublic ? isPublic : super.canActivate(context);
  }
}
