import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { StoresComponent } from './components/stores/stores.component';

import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './auth.guard'


const routes: Routes = [
  { path: '', component: ProductsComponent, data: { page: 'Products' } },
  { path: 'products/:docId', component: ProductDetailsComponent, data: { page: '' } },
  { path: 'stores', component: StoresComponent, data: { page: 'Store Locator' } },
  { path: 'account', component: AccountComponent, data: { page: 'Account' } },
  { path: 'cart', component: CartComponent, data: { page: 'Cart' }, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
