import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri

  constructor(private http: HttpClient) {
     this.http.get(window.location.origin + '/backend').subscribe(data => {
      this.uri = data
    })
  }
  

  getElements() {
    return this.http.get(`${this.uri}/elements`);
  }
  getElementByName(element) {
    return this.http.get(`${this.uri}/elements/${element}`);
  }
}
