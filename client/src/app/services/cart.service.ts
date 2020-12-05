import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource = new ReplaySubject<any>();

  constructor() {}

  addProduct(item) {
    this.cartSource.next(item)
  }

  getProduct(): Observable<any> {
    return this.cartSource.asObservable();
  }

  clearCart() {
    this.cartSource.next()
  }
}
