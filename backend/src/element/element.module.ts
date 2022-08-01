import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { CoreModule } from 'src/core/core.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [CoreModule],
  controllers: [ElementController],
  providers: [ElementService, UserService],
  exports: [ElementService],
})
export class ElementModule {}
