import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementDialogComponent } from './element-dialog/element-dialog.component';
import { PeriodicTableSvgComponent } from './periodic-table-svg/periodic-table-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementDialogComponent,
    PeriodicTableSvgComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
    ElementDialogComponent,
    PeriodicTableSvgComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
