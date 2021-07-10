import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = environment.uri;

  constructor(private http: HttpClient) {}

  getElements(): Observable<Element[]>  {
    return this.http.get<Element[]>(`${this.uri}/elements`);
  }

  getElementById(id: number): Observable<Element> {
    return this.http.get<Element>(`${this.uri}/elements/${id}`);
  }

  getElementByName(name: string): Observable<Element> {
    return this.http.get<Element>(`${this.uri}/elements/${name}`);
  }
}
