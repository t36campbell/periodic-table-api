import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ElementModule } from './element/element.module';
import { AtomicParticlesModule } from './atomic-particles/atomic-particles.module';
import { ElectronShellModule } from './electron-shell/electron-shell.module';
import { ElementPropertiesModule } from './element-properties/element-properties.module';
import { ElementDetailsModule } from './element-details/element-details.module';
import { ElementDiscovererModule } from './element-discoverer/element-discoverer.module';
import { ElementGroupModule } from './element-group/element-group.module';
import { ElementPeriodModule } from './element-period/element-period.module';
import { ElementTypeModule } from './element-type/element-type.module';
import { ElementPhaseModule } from './element-phase/element-phase.module';
import { ElementPhaseTypeModule } from './element-phase-type/element-phase-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ElementModule,
    AtomicParticlesModule,
    ElectronShellModule,
    ElementPropertiesModule,
    ElementDetailsModule,
    ElementDiscovererModule,
    ElementGroupModule,
    ElementPeriodModule,
    ElementTypeModule,
    ElementPhaseModule,
    ElementPhaseTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
