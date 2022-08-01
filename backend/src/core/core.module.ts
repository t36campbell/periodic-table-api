import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { CoreService } from './core.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [],
  providers: [CoreService, PrismaService, JwtStrategy],
  exports: [CoreService, PrismaService, JwtStrategy, JwtModule],
})
export class CoreModule {}
