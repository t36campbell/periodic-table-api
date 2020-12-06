import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getElements() {
    return this.http.get(`${this.uri}/elements`);
  }
  getElementByName(element) {
    return this.http.get(`${this.uri}/elements/${element}`);
  }
}
