import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ActiveUserGuard } from './guards/active-user.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserGuard } from './guards/update-user.guard';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ActiveUserGuard,
    JwtAuthGuard,
    RoleGuard,
    UpdateUserGuard,
    UserService,
  ],
  exports: [
    AuthService,
    ActiveUserGuard,
    JwtAuthGuard,
    RoleGuard,
    UpdateUserGuard,
  ],
})
export class AuthModule {}
