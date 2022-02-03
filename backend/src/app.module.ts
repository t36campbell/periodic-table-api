import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ElementModule } from './element/element.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ElementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
