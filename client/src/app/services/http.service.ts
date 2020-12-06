import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = environment.uri;

  constructor(private http: HttpClient) {}

  getElements() {
    return this.http.get(`${this.uri}/elements`);
  }
  getElementByName(element) {
    return this.http.get(`${this.uri}/elements/${element}`);
  }
}
