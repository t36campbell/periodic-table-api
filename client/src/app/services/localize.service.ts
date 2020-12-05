import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {
  language$: Observable<any>;
  currency$: Observable<any>;
  unit$: Observable<any>;
  private languageSubject = new BehaviorSubject<any>("");
  private currencySubject = new BehaviorSubject<any>("");
  private unitSubject = new BehaviorSubject<any>("");

  constructor() {
      this.language$= this.languageSubject.asObservable();
      this.currency$= this.currencySubject.asObservable();
      this.unit$= this.unitSubject.asObservable();
  }

  setLang(lang: string) {
      this.languageSubject.next(lang);
  }
  setCurrency(unit: string) {
    this.currencySubject.next(unit);
  }
  setUnit(unit: number) {
    this.unitSubject.next(unit);
  }
}
