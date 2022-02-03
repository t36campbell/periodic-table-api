import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './role.guard';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy, JwtAuthGuard, RoleGuard],
  exports: [PrismaService, JwtStrategy, JwtAuthGuard, RoleGuard, JwtModule],
})
export class CoreModule {}
