import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent } from './components/elements/elements.component';
import { ElementDetailsComponent } from './components/elements/element-details/element-details.component';


const routes: Routes = [
  { path: '', component: ElementsComponent, data: { page: 'Elements' } },
  { path: 'elements/:Element', component: ElementDetailsComponent, data: { page: '' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
