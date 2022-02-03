import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [ElementController],
  providers: [ElementService],
  exports: [ElementService],
})
export class ElementModule {}
