import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ActiveUserGuard } from './active-user.guard';
import { UserModule } from 'src/user/user.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, ActiveUserGuard],
  exports: [AuthService, ActiveUserGuard],
})
export class AuthModule {}
